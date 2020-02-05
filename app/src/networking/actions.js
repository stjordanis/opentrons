// @flow

import * as Constants from './constants'
import * as Types from './types'

import type { RobotApiRequestMeta } from '../robot-api/types'

export const fetchStatus = (robotName: string): Types.FetchStatusAction => ({
  type: Constants.FETCH_STATUS,
  payload: { robotName },
  meta: {},
})

export const fetchStatusSuccess = (
  robotName: string,
  networkStatus: Types.NetworkingStatusResponse,
  meta: RobotApiRequestMeta
): Types.FetchStatusSuccessAction => ({
  type: Constants.FETCH_STATUS_SUCCESS,
  payload: { robotName, networkStatus },
  meta,
})

export const fetchStatusFailure = (
  robotName: string,
  error: {},
  meta: RobotApiRequestMeta
): Types.FetchStatusFailureAction => ({
  type: Constants.FETCH_STATUS_FAILURE,
  payload: { robotName, error },
  meta,
})

export const fetchWifiList = (
  robotName: string
): Types.FetchWifiListAction => ({
  type: Constants.FETCH_WIFI_LIST,
  payload: { robotName },
  meta: {},
})

export const fetchWifiListSuccess = (
  robotName: string,
  networkList: Types.WifiListResponse,
  meta: RobotApiRequestMeta
): Types.FetchWifiListSuccessAction => ({
  type: Constants.FETCH_WIFI_LIST_SUCCESS,
  payload: { robotName, networkList },
  meta,
})

export const fetchWifiListFailure = (
  robotName: string,
  error: {},
  meta: RobotApiRequestMeta
): Types.FetchWifiListFailureAction => ({
  type: Constants.FETCH_WIFI_LIST_FAILURE,
  payload: { robotName, error },
  meta,
})

export const fetchWifiEapOptions = (
  robotName: string
): Types.FetchWifiEapOptionsAction => ({
  type: Constants.FETCH_WIFI_EAP_OPTIONS,
  payload: { robotName },
  meta: {},
})

export const fetchWifiEapOptionsSuccess = (
  robotName: string,
  eapOptions: Types.WifiEapOptionsResponse,
  meta: RobotApiRequestMeta
): Types.FetchWifiEapOptionsSuccessAction => ({
  type: Constants.FETCH_WIFI_EAP_OPTIONS_SUCCESS,
  payload: { robotName, eapOptions },
  meta,
})

export const fetchWifiEapOptionsFailure = (
  robotName: string,
  error: {},
  meta: RobotApiRequestMeta
): Types.FetchWifiEapOptionsFailureAction => ({
  type: Constants.FETCH_WIFI_EAP_OPTIONS_FAILURE,
  payload: { robotName, error },
  meta,
})

export const fetchWifiKeys = (
  robotName: string
): Types.FetchWifiKeysAction => ({
  type: Constants.FETCH_WIFI_KEYS,
  payload: { robotName },
  meta: {},
})

export const fetchWifiKeysSuccess = (
  robotName: string,
  wifiKeys: Types.WifiKeysResponse,
  meta: RobotApiRequestMeta
): Types.FetchWifiKeysSuccessAction => ({
  type: Constants.FETCH_WIFI_KEYS_SUCCESS,
  payload: { robotName, wifiKeys },
  meta,
})

export const fetchWifiKeysFailure = (
  robotName: string,
  error: {},
  meta: RobotApiRequestMeta
): Types.FetchWifiKeysFailureAction => ({
  type: Constants.FETCH_WIFI_KEYS_FAILURE,
  payload: { robotName, error },
  meta,
})

export const addWifiKeys = (
  robotName: string,
  key: Types.WifiKeysRequest
): Types.AddWifiKeysAction => ({
  type: Constants.WIFI_KEYS,
  payload: { robotName, key },
  meta: {},
})

export const addWifiKeysSuccess = (
  robotName: string,
  key: Types.WifiKey,
  meta: RobotApiRequestMeta
): Types.AddWifiKeysSuccessAction => ({
  type: Constants.WIFI_KEYS_SUCCESS,
  payload: { robotName, key },
  meta,
})

export const addWifiKeysFailure = (
  robotName: string,
  error: {},
  meta: RobotApiRequestMeta
): Types.AddWifiKeysFailureAction => ({
  type: Constants.WIFI_KEYS_FAILURE,
  payload: { robotName, error },
  meta,
})

export const configureWifi = (
  robotName: string,
  config: Types.WifiConfigureRequest
): Types.ConfigureWifiAction => ({
  type: Constants.WIFI_CONFIGURE,
  payload: { robotName, config },
  meta: {},
})

export const configureWifiSuccess = (
  robotName: string,
  response: Types.WifiConfigureResponse,
  meta: RobotApiRequestMeta
): Types.ConfigureWifiSuccessAction => ({
  type: Constants.WIFI_CONFIGURE_SUCCESS,
  payload: { robotName, response },
  meta,
})

export const configureWifiFailure = (
  robotName: string,
  error: {},
  meta: RobotApiRequestMeta
): Types.ConfigureWifiFailureAction => ({
  type: Constants.WIFI_CONFIGURE_FAILURE,
  payload: { robotName, error },
  meta,
})
