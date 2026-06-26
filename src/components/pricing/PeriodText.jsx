import { useEffect, useRef } from 'react'
import { subscribe, getPricingState } from '../../data/pricingStore.js'

const LABEL = {
  monthly: '/month',
  annual: '/month, billed annually',
}

/**
 * Same isolation pattern as PriceText: mounts once, then updates
 * its own textContent directly on store changes without ever
 * triggering a React re-render.
 */
export default function PeriodText() {
  const spanRef = useRef(null)
  const initial = getPricingState()

  useEffect(() => {
    return subscribe(({ cycle }) => {
      if (spanRef.current) spanRef.current.textContent = LABEL[cycle]
    })
  }, [])

  return (
    <span ref={spanRef} className="text-sm opacity-70">
      {LABEL[initial.cycle]}
    </span>
  )
}
