from opentrons import __version__
from fastapi import FastAPI
from starlette.responses import JSONResponse
from starlette.requests import Request
from .routers import health, networking, control, settings, deck_calibration, \
    modules, pipettes, motors
from .models import V1BasicResponse
from .exceptions import V1HandlerError


app = FastAPI(
    title="Opentrons OT-2 HTTP API Spec",
    description="This OpenAPI spec describes the HTTP API of the Opentrons "
                "OT-2. It may be retrieved from a robot on port 31950 at "
                "/openapi. Some schemas used in requests and responses use "
                "the `x-patternProperties` key to mean the JSON Schema "
                "`patternProperties` behavior.",
    version=__version__
)


app.include_router(router=health.router,
                   tags=["health"])
app.include_router(router=networking.router,
                   tags=["networking"])
app.include_router(router=control.router,
                   tags=["control"])
app.include_router(router=settings.router,
                   tags=["settings"])
app.include_router(router=deck_calibration.router,
                   tags=["deckCalibration"])
app.include_router(router=modules.router,
                   tags=["modules"])
app.include_router(router=pipettes.router,
                   tags=["pipettes"])
app.include_router(router=motors.router,
                   tags=["motors"])


@app.exception_handler(V1HandlerError)
async def v1_exception_handler(request: Request, exc: V1HandlerError):
    return JSONResponse(
        status_code=exc.status_code,
        content=V1BasicResponse(message=exc.message).dict()
    )
