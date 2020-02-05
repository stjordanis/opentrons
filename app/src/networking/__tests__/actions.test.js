// @flow

import * as Actions from '../actions'
import * as Fixtures from '../__fixtures__'

import type { NetworkingAction } from '../types'

const RobotName: string = 'robot-name'

const Meta: {} = { requestId: 'abc' }

type ActionSpec = {|
  name: string,
  creator: (...Array<any>) => mixed,
  args: Array<mixed>,
  expected: NetworkingAction,
|}

describe('networking actions', () => {
  const SPECS: Array<ActionSpec> = [
    {
      name: 'networking:FETCH_STATUS',
      creator: Actions.fetchStatus,
      args: [RobotName],
      expected: {
        type: 'networking:FETCH_STATUS',
        payload: { robotName: RobotName },
        meta: {},
      },
    },
    {
      name: 'networking:FETCH_STATUS_SUCCESS',
      creator: Actions.fetchStatusSuccess,
      args: [RobotName, Fixtures.mockNetworkingStatusSuccess.body, Meta],
      expected: {
        type: 'networking:FETCH_STATUS_SUCCESS',
        payload: {
          robotName: RobotName,
          networkStatus: Fixtures.mockNetworkingStatusSuccess.body,
        },
        meta: Meta,
      },
    },
    {
      name: 'networking:FETCH_STATUS_FAILURE',
      creator: Actions.fetchStatusFailure,
      args: [RobotName, Fixtures.mockNetworkingStatusFailure.body, Meta],
      expected: {
        type: 'networking:FETCH_STATUS_FAILURE',
        payload: {
          robotName: RobotName,
          error: Fixtures.mockNetworkingStatusFailure.body,
        },
        meta: Meta,
      },
    },
    {
      name: 'networking:FETCH_WIFI_LIST',
      creator: Actions.fetchWifiList,
      args: [RobotName],
      expected: {
        type: 'networking:FETCH_WIFI_LIST',
        payload: {
          robotName: RobotName,
        },
        meta: {},
      },
    },
    {
      name: 'networking:FETCH_WIFI_LIST_SUCCESS',
      creator: Actions.fetchWifiListSuccess,
      args: [RobotName, Fixtures.mockWifiListSuccess.body, Meta],
      expected: {
        type: 'networking:FETCH_WIFI_LIST_SUCCESS',
        payload: {
          robotName: RobotName,
          networkList: Fixtures.mockWifiListSuccess.body,
        },
        meta: Meta,
      },
    },
    {
      name: 'networking:FETCH_WIFI_LIST_FAILURE',
      creator: Actions.fetchWifiListFailure,
      args: [RobotName, Fixtures.mockWifiListFailure.body, Meta],
      expected: {
        type: 'networking:FETCH_WIFI_LIST_FAILURE',
        payload: {
          robotName: RobotName,
          error: Fixtures.mockWifiListFailure.body,
        },
        meta: Meta,
      },
    },
    {
      name: 'networking:FETCH_WIFI_EAP_OPTIONS',
      creator: Actions.fetchWifiEapOptions,
      args: [RobotName],
      expected: {
        type: 'networking:FETCH_WIFI_EAP_OPTIONS',
        payload: {
          robotName: RobotName,
        },
        meta: {},
      },
    },
    {
      name: 'networking:FETCH_WIFI_EAP_OPTIONS_SUCCESS',
      creator: Actions.fetchWifiEapOptionsSuccess,
      args: [RobotName, Fixtures.mockWifiEapOptionsSuccess.body, Meta],
      expected: {
        type: 'networking:FETCH_WIFI_EAP_OPTIONS_SUCCESS',
        payload: {
          robotName: RobotName,
          eapOptions: Fixtures.mockWifiEapOptionsSuccess.body,
        },
        meta: Meta,
      },
    },
    {
      name: 'networking:FETCH_WIFI_EAP_OPTIONS_FAILURE',
      creator: Actions.fetchWifiEapOptionsFailure,
      args: [RobotName, Fixtures.mockWifiEapOptionsFailure.body, Meta],
      expected: {
        type: 'networking:FETCH_WIFI_EAP_OPTIONS_FAILURE',
        payload: {
          robotName: RobotName,
          error: Fixtures.mockWifiEapOptionsFailure.body,
        },
        meta: Meta,
      },
    },
    {
      name: 'networking:FETCH_WIFI_KEYS',
      creator: Actions.fetchWifiKeys,
      args: [RobotName],
      expected: {
        type: 'networking:FETCH_WIFI_KEYS',
        payload: {
          robotName: RobotName,
        },
        meta: {},
      },
    },
    {
      name: 'networking:FETCH_WIFI_KEYS_SUCCESS',
      creator: Actions.fetchWifiKeysSuccess,
      args: [RobotName, Fixtures.mockWifiKeysSuccess.body, Meta],
      expected: {
        type: 'networking:FETCH_WIFI_KEYS_SUCCESS',
        payload: {
          robotName: RobotName,
          wifiKeys: Fixtures.mockWifiKeysSuccess.body,
        },
        meta: Meta,
      },
    },
    {
      name: 'networking:FETCH_WIFI_KEYS_FAILURE',
      creator: Actions.fetchWifiKeysFailure,
      args: [RobotName, Fixtures.mockWifiKeysFailure.body, Meta],
      expected: {
        type: 'networking:FETCH_WIFI_KEYS_FAILURE',
        payload: {
          robotName: RobotName,
          error: Fixtures.mockWifiKeysFailure.body,
        },
        meta: Meta,
      },
    },
  ]

  SPECS.forEach(spec => {
    const { name, creator, args, expected } = spec
    test(name, () => expect(creator(...args)).toEqual(expected))
  })
})
