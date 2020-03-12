from typing import Generic, TypeVar, Optional, List, Dict, Any, Type, get_type_hints
from typing_extensions import Literal

from pydantic.generics import GenericModel

from .filter import filter_none
from .resource_links import ResourceLinks

TypeT = TypeVar('TypeT', bound=str)
AttributesT = TypeVar('AttributesT')
class ResponseDataModel(GenericModel, Generic[TypeT, AttributesT]):
    """
    """
    id: str
    type: TypeT
    attributes: AttributesT = {} # type: ignore

    class Config:
        validate_all = True

DataT = TypeVar('DataT', bound=ResponseDataModel)
class ResponseModel(GenericModel, Generic[DataT]):
    """
    """
    meta: Optional[Dict]
    data: DataT
    links: Optional[ResourceLinks]

    def dict(
        self,
        *,
        serialize_none: bool = False,
        **kwargs
    ):
        response = super().dict(**kwargs)
        if serialize_none:
            return response
        return filter_none(response)

    @classmethod
    def resource_object(
        cls,
        *,
        id: str,
        attributes: Optional[Dict] = None,
    ) -> ResponseDataModel:
        data_type = get_type_hints(cls)['data']
        if getattr(data_type, '__origin__', None) is list:
            data_type = data_type.__args__[0]
        typename = get_type_hints(data_type)['type'].__args__[0]
        return data_type(
            id=id,
            type=typename,
            attributes=attributes or {},
        )

def JsonApiResponse(
    type_string: str,
    attributes_model: Any,
    *,
    use_list: bool = False
) -> Type[ResponseModel]:
    response_data_model = ResponseDataModel[
        Literal[type_string], # type: ignore
        attributes_model, # type: ignore
    ]
    if use_list:
        response_data_model = List[response_data_model] # type: ignore
        response_data_model.__name__ = f'ListResponseData[{type_string}]'
        response_model_list = ResponseModel[response_data_model]
        response_model_list.__name__ = f'ListResponse[{type_string}]'
        return response_model_list
    else:
        response_data_model.__name__ = f'ResponseData[{type_string}]'
        response_model = ResponseModel[response_data_model]
        response_model.__name__ = f'Response[{type_string}]'
        return response_model