// @flow
import { useEffect, useState } from 'react'
import Popper from 'popper.js'

export type UseTooltipHook = {|
  targetRef: (Element | null) => mixed,
  tooltipRef: (Element | null) => mixed,
  arrowRef: (Element | null) => mixed,
|}

export function useTooltip() {
  const [target, targetRef] = useState<Element | null>(null)
  const [tooltip, tooltipRef] = useState<Element | null>(null)
  const [, arrowRef] = useState<Element | null>(null)

  useEffect(() => {
    let popper = null

    if (target && tooltip) {
      popper = new Popper(target, tooltip, {})
    }

    return () => {
      popper && popper.destroy()
    }
  }, [target, tooltip])

  return { targetRef, tooltipRef, arrowRef }
}
