// @flow
// mock responses for networking endpoints

import partial from 'lodash/partial'
import placeholder from 'lodash'

import type { RobotApiResponse } from '../../robot-api/types'

export const mockRobot = { name: 'robot', ip: '127.0.0.1', port: 31950 }

// helpers

function makeMeta(
  method: string,
  path: string,
  ok: boolean,
  status: number
): {} {
  return { method, path, ok, status }
}

const makeSuccessMeta = partial(makeMeta, placeholder, placeholder, true, 200)
const makeErrorMeta = partial(makeMeta, placeholder, placeholder, false, 500)

function makeResponse(metadata, host, body): RobotApiResponse {
  return {
    ...metadata,
    host,
    body,
  }
}

// Fetch networking status fixtures

export const mockNetworkingStatus = {
  status: 'full',
  interfaces: {
    wlan0: {
      ipAddress: '192.168.43.97/24',
      macAddress: 'B8:27:EB:6C:95:CF',
      gatewayAddress: '192.168.43.161',
      state: 'connected',
      type: 'wifi',
    },
    eth0: {
      ipAddress: '169.254.229.173/16',
      macAddress: 'B8:27:EB:39:C0:9A',
      gatewayAddress: null,
      state: 'connected',
      type: 'ethernet',
    },
  },
}

export const mockNetworkingStatusSuccessMeta = makeSuccessMeta(
  'GET',
  '/networking/status'
)

export const mockNetworkingStatusSuccess = makeResponse(
  mockNetworkingStatusSuccessMeta,
  mockRobot,
  mockNetworkingStatus
)

export const mockNetworkingStatusFailureMeta = makeErrorMeta(
  'GET',
  '/networking/status'
)

export const mockNetworkingStatusFailure = makeResponse(
  mockNetworkingStatusFailureMeta,
  mockRobot,
  { message: 'Networking Status Fail' }
)

// Fetch wifi list fixtures

export const mockWifiList = {
  list: [
    {
      ssid: 'linksys',
      signal: 50,
      active: false,
      security: 'WPA2 802.1X',
      securityType: 'wpa-eap',
    },
  ],
}

export const mockWifiListSuccessMeta = makeSuccessMeta('GET', '/wifi/list')

export const mockWifiListSuccess = makeResponse(
  mockWifiListSuccessMeta,
  mockRobot,
  mockWifiList
)

export const mockWifiListFailureMeta = makeErrorMeta('GET', '/wifi/list')

export const mockWifiListFailure = makeResponse(
  mockWifiListFailureMeta,
  mockRobot,
  { message: 'Wifi List Fail' }
)

// Fetch wifi eap options fixtures

export const mockEapOptions = {
  options: [
    {
      name: 'peap/mschapv2',
      displayName: 'PEAP/MS-CHAP v2',
      options: [
        {
          name: 'identity',
          displayName: 'Username',
          required: true,
          type: 'string',
        },
        {
          name: 'anonymousIdentity',
          displayName: 'Anonymous Identity',
          required: false,
          type: 'string',
        },
        {
          name: 'caCert',
          displayName: 'CA Certificate File',
          required: false,
          type: 'file',
        },
        {
          name: 'password',
          displayName: 'password',
          required: true,
          type: 'password',
        },
      ],
    },
  ],
}

export const mockWifiEapOptionsSuccessMeta = makeSuccessMeta(
  'GET',
  '/wifi/eap-options'
)

export const mockWifiEapOptionsSuccess = makeResponse(
  mockWifiEapOptionsSuccessMeta,
  mockRobot,
  mockEapOptions
)

export const mockWifiEapOptionsFailureMeta = makeErrorMeta(
  'GET',
  '/wifi/eap-options'
)

export const mockWifiEapOptionsFailure = makeResponse(
  mockWifiEapOptionsFailureMeta,
  mockRobot,
  { message: 'EAP Fail' }
)

// Fetch wifi keys fixtures

export const mockWifiKeys = {
  keys: [
    { uri: '/wifi/keys/abda234a234', id: 'abda234a234', name: 'client.pem' },
  ],
}

export const mockWifiKeysSuccessMeta = makeSuccessMeta('GET', '/wifi/keys')

export const mockWifiKeysSuccess = makeResponse(
  mockWifiKeysSuccessMeta,
  mockRobot,
  mockWifiKeys
)

export const mockWifiKeysFailureMeta = makeErrorMeta('GET', '/wifi/keys')

export const mockWifiKeysFailure = makeResponse(
  mockWifiKeysFailureMeta,
  mockRobot,
  { message: 'Key ListFail' }
)

// add wifi key fixtures

// configure fixtures
