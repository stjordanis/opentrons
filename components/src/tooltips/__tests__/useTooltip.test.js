// @flow
import * as React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import Popper from 'popper.js'

import { useTooltip } from '../useTooltip'

jest.mock('popper.js')

describe('useTooltip', () => {
  const TestUseTooltip = () => {
    const { targetRef, tooltipRef, arrowRef } = useTooltip()

    return (
      <>
        <span id="target" ref={targetRef} />
        <span id="tooltip" ref={tooltipRef} />
        <span id="arrow" ref={arrowRef} />
      </>
    )
  }

  test('passes refs to popper', () => {
    const wrapper = mount(<TestUseTooltip />)

    const target = wrapper.find('#target').getDOMNode()
    const tooltip = wrapper.find('#tooltip').getDOMNode()

    expect(Popper).toHaveBeenCalledWith(target, tooltip, expect.any(Object))
  })
})
