// @flow
import * as React from 'react'
import { mount } from 'enzyme'
import Popper from 'popper.js'

import { useTooltip } from '../useTooltip'

jest.mock('popper.js')

const MockPopper: JestMockFn<any, any> = Popper

type TestUseTooltipProps = {|
  showTarget?: boolean,
  showTooltip?: boolean,
|}

describe('useTooltip', () => {
  const TestUseTooltip = (props: TestUseTooltipProps) => {
    const { showTarget = true, showTooltip = true } = props
    const { targetRef, tooltipRef, arrowRef } = useTooltip()

    return (
      <>
        {showTarget && <span id="target" ref={targetRef} />})
        {showTooltip && <span id="tooltip" ref={tooltipRef} />})
        <span id="arrow" ref={arrowRef} />
      </>
    )
  }

  beforeEach(() => {
    MockPopper.mockImplementation(() => ({
      destroy: jest.fn(),
    }))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('passes refs to popper', () => {
    const wrapper = mount(<TestUseTooltip />)

    const target = wrapper.find('#target').getDOMNode()
    const tooltip = wrapper.find('#tooltip').getDOMNode()

    expect(MockPopper).toHaveBeenCalledWith(target, tooltip, expect.any(Object))
  })

  test(`doesn't create a popper instance if nodes are missing`, () => {
    mount(<TestUseTooltip showTooltip={false} />)

    expect(MockPopper).not.toHaveBeenCalled()
  })

  test('creates popper instance if target node mounts', () => {
    const wrapper = mount(
      <TestUseTooltip showTarget={false} showTooltip={true} />
    )
    expect(MockPopper).not.toHaveBeenCalled()
    wrapper.setProps({ showTarget: true })
    expect(MockPopper).toHaveBeenCalled()
  })

  test('destroys popper instance if tooltip node unmounts', () => {
    const wrapper = mount(<TestUseTooltip showTooltip={true} />)
    const popper = MockPopper.mock.results[0].value

    wrapper.setProps({ showTooltip: false })
    expect(popper.destroy).toHaveBeenCalled()
  })
})
