// @flow
// generic api reducer
// DEPRECATED(mc, 2020-01-13)
import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'
import { normalizeRobots } from '../discovery/reducer'

import type { Service } from '@opentrons/discovery-client'
import type { State, Action } from '../types'
import type { BaseRobot } from '../robot'

export type RobotApiState = $Shape<{|
  [path: string]: any,
|}>

type ApiState = { [name: string]: ?RobotApiState }

export function apiReducer(state: ApiState = {}, action: Action): ApiState {
  switch (action.type) {
    case 'api:REQUEST': {
      const { request } = action.payload
      const { name, path, stateByName, stateByPath } = getUpdateInfo(
        state,
        action
      )

      return {
        ...state,
        [name]: {
          ...stateByName,
          [path]: { ...stateByPath, request, inProgress: true, error: null },
        },
      }
    }

    case 'api:SUCCESS': {
      const { response } = action.payload
      const { name, path, stateByName, stateByPath } = getUpdateInfo(
        state,
        action
      )

      return {
        ...state,
        [name]: {
          ...stateByName,
          [path]: { ...stateByPath, response, inProgress: false, error: null },
        },
      }
    }

    case 'api:FAILURE': {
      const { error } = action.payload
      const { name, path, stateByName, stateByPath } = getUpdateInfo(
        state,
        action
      )
      if (!stateByPath || !stateByPath.inProgress) return state

      return {
        ...state,
        [name]: {
          ...stateByName,
          [path]: { ...stateByPath, error, inProgress: false },
        },
      }
    }

    case 'api:CLEAR_RESPONSE': {
      const { name, path, stateByName, stateByPath } = getUpdateInfo(
        state,
        action
      )

      return {
        ...state,
        [name]: {
          ...stateByName,
          [path]: {
            ...stateByPath,
            response: null,
            inProgress: false,
            error: null,
          },
        },
      }
    }

    case 'discovery:UPDATE_LIST':
      return reduce(
        normalizeRobots(action.payload.robots),
        (apiState: ApiState, robots: Array<Service>, name: string) => {
          const up =
            robots.some(r => r.ok) ||
            robots.some(r => r.serverOk) ||
            robots.some(r => r.advertising)

          // clear api request/response state if robot is fully offline
          return !up && !isEmpty(apiState[name])
            ? { ...apiState, [name]: {} }
            : apiState
        },
        state
      )
  }

  return state
}

export function getRobotApiState(
  state: State,
  props: BaseRobot
): RobotApiState {
  return state.superDeprecatedRobotApi.api[props.name] || {}
}

function getUpdateInfo(state: ApiState, action: any): any {
  const {
    path,
    robot: { name },
  } = action.payload
  const stateByName = state[name] || {}
  const stateByPath = stateByName[path] || {}

  return { name, path, stateByName, stateByPath }
}
