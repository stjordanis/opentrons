from typing import Optional, List, Dict
from pydantic import BaseModel, ValidationError

# https://github.com/encode/starlette/blob/master/starlette/status.py
from starlette.status import HTTP_422_UNPROCESSABLE_ENTITY

from .resource_links import ResourceLinks


class ErrorSource(BaseModel):
    pointer: Optional[str]
    parameter: Optional[str]


class Error(BaseModel):
    """https://jsonapi.org/format/#error-objects"""
    id: Optional[str]
    links: Optional[ResourceLinks]
    status: Optional[str]
    code: Optional[str]
    title: Optional[str]
    detail: Optional[str]
    source: Optional[ErrorSource]
    meta: Optional[Dict]


class ErrorResponse(BaseModel):
    errors: List[Error]


def transform_http_exception_to_json_api_errors(exception) -> Dict:
    request_error = Error(
        status=exception.status_code,
        detail=exception.detail,
        title='Bad Request'
    )
    error_response = ErrorResponse(errors=[request_error])
    return error_response.dict(exclude_unset=True)

def transform_validation_error_to_json_api_errors(status_code, exception) -> Dict:
    def transform_error(error):
        return Error(
            status=status_code,
            detail=error.get('msg'),
            source=ErrorSource(pointer='/' + '/'.join(error['loc'])),
            title=error.get('type')
        )

    error_response = ErrorResponse(
        errors=[transform_error(error) for error in exception.errors()]
    )
    return error_response.dict(exclude_unset=True)