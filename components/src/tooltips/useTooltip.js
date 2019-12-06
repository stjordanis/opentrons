// @flow
import { useRef, useEffect } from 'react'
import Popper from 'popper.js'

export function useTooltip() {
  const targetRef = useRef<Element | null>(null)
  const tooltipRef = useRef<Element | null>(null)
  const arrowRef = useRef<Element | null>(null)

  useEffect(() => {
    if (targetRef.current && tooltipRef.current) {
      const popper = new Popper(targetRef.current, tooltipRef.current, {})
      void popper
    }
  }, [])

  return { targetRef, tooltipRef, arrowRef }
}
