import asyncio
from http import HTTPStatus
from fastapi import Path, APIRouter, Depends
from opentrons.hardware_control import HardwareAPILike, modules

from robot_server.service.dependencies import get_hardware
from robot_server.service.models import V1ErrorMessage
from robot_server.service.exceptions import V1HandlerError
from robot_server.service.models.modules import Module, ModuleSerial,\
    Modules, SerialCommandResponse, SerialCommand


router = APIRouter()


@router.get("/modules",
            description="Describe the modules attached to the OT-2",
            response_model=Modules)
async def get_modules(hardware: HardwareAPILike = Depends(get_hardware))\
        -> Modules:
    attached_modules = hardware.attached_modules   # type: ignore
    module_data = [
        Module(
            name=mod.name(),  # TODO: legacy, remove
            displayName=mod.name(),  # TODO: legacy, remove
            model=mod.device_info.get('model'),  # TODO legacy, remove
            moduleModel=mod.model(),
            port=mod.port,  # /dev/ttyS0
            serial=mod.device_info.get('serial'),
            revision=mod.device_info.get('model'),
            fwVersion=mod.device_info.get('version'),
            hasAvailableUpdate=mod.has_available_update(),
            status=mod.live_data['status'],
            data=mod.live_data['data']
        )
        for mod in attached_modules
    ]
    return Modules(modules=module_data)


@router.get("/modules/{serial}/data",
            description="Get live data for a specific module",
            summary="This is similar to the values in GET /modules, but for "
                    "only a specific currently-attached module",
            response_model=ModuleSerial)
async def get_module_serial(
        serial: str = Path(...,
                           description="Serial number of the module"),
        hardware: HardwareAPILike = Depends(get_hardware)) \
        -> ModuleSerial:
    res = None

    attached_modules = hardware.attached_modules   # type: ignore
    if attached_modules:
        for module in attached_modules:
            is_serial_match = module.device_info.get('serial') == serial
            if is_serial_match and hasattr(module, 'live_data'):
                res = module.live_data

    if not res:
        raise V1HandlerError(status_code=404, message="Module not found")

    return ModuleSerial(status=res.get('status'), data=res.get('data'))


@router.post("/modules/{serial}",
             description="Execute a command on a specific module",
             summary="Command a module to take an action. Valid actions depend"
                     " on the specific module attached, which is the model "
                     "value from GET /modules/{serial}/data or GET /modules",
             response_model=SerialCommandResponse)
async def post_serial_command(
        command: SerialCommand,
        serial: str = Path(...,
                           description="Serial number of the module"),
        hardware: HardwareAPILike = Depends(get_hardware)) \
        -> SerialCommandResponse:
    """Send a command on device identified by serial"""
    modules = hardware.attached_modules     # type: ignore
    if not modules:
        raise V1HandlerError(message="No connected modules",
                             status_code=HTTPStatus.NOT_FOUND)

    # Search for the module
    matching_mod = next((mod for mod in modules if
                         mod.device_info.get('serial') == serial),
                        None)

    if not matching_mod:
        raise V1HandlerError(message="Specified module not found",
                             status_code=HTTPStatus.NOT_FOUND)

    if hasattr(matching_mod, command.command_type):
        clean_args = command.args or []
        method = getattr(matching_mod, command.command_type)
        if asyncio.iscoroutinefunction(method):
            val = await method(*clean_args)
        else:
            val = method(*clean_args)

        return SerialCommandResponse(message='Success', returnValue=val)
    else:
        raise V1HandlerError(
            message=f'Module does not have command: {command.command_type}',
            status_code=HTTPStatus.BAD_REQUEST)


@router.post("/modules/{serial}/update",
             description="Initiate a firmware update on a specific module",
             summary="Command robot to flash its bundled firmware file for "
                     "this module's type to this specific module",
             response_model=V1ErrorMessage)
async def post_serial_update(
        serial: str = Path(...,
                           description="Serial number of the module"),
        hardware: HardwareAPILike = Depends(get_hardware))\
        -> V1ErrorMessage:
    """Update module firmware"""
    matching_module = None
    attached_modules = hardware.attached_modules     # type: ignore
    for module in attached_modules:
        if module.device_info.get('serial') == serial:
            matching_module = module
            break

    if not matching_module:
        raise V1HandlerError(message=f'Module {serial} not found',
                             status_code=404)

    try:
        if matching_module.bundled_fw:
            await asyncio.wait_for(
                modules.update_firmware(
                    matching_module,
                    matching_module.bundled_fw.path,
                    asyncio.get_event_loop()),
                100)
            return V1ErrorMessage(
                message=f'Successfully updated module {serial}'
            )
        else:
            res = (f'Bundled fw file not found for module of '
                   f'type: {matching_module.name()}')
            status = 500
    except modules.UpdateError as e:
        res = f'Update error: {e}'
        status = 500
    except asyncio.TimeoutError:
        res = 'Module not responding'
        status = 500
    raise V1HandlerError(message=res, status_code=status)
