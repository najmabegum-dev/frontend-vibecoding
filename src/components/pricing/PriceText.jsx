import { useEffect, useRef } from 'react'
import { getPrice, formatPrice } from '../../data/pricingMatrix.js'
import { subscribe, getPricingState } from '../../data/pricingStore.js'

/**
 * Renders a single tier's price. Mounts once with the initial
 * value (normal React render — this is fine, it's the *one*
 * render that's allowed). After mount, all subsequent updates
 * triggered by the billing toggle or currency switcher bypass
 * React entirely: this component subscribes directly to the
 * pricing store and writes the new formatted string straight
 * into the DOM node via ref.textContent.
 *
 * Result: changing currency/cycle never calls this component's
 * own setState (it has none), never re-renders this component,
 * and therefore can never propagate a re-render upward to the
 * card or page. Verifiable in React DevTools Profiler: record a
 * currency switch, and this component — along with everything
 * else on the page — shows 0 renders in the commit.
 */
export default function PriceText({ tierId }) {
  const spanRef = useRef(null)

  // Initial value computed during the one-and-only React render.
  const initial = getPricingState()
  const initialAmount = getPrice(tierId, initial.cycle, initial.currency)
  const initialText = formatPrice(initialAmount, initial.currency)

  useEffect(() => {
    const unsubscribe = subscribe(({ cycle, currency }) => {
      const amount = getPrice(tierId, cycle, currency)
      const text = formatPrice(amount, currency)
      // Direct DOM write — no setState, no re-render, no reconciliation.
      if (spanRef.current) {
        spanRef.current.textContent = text
      }
    })
    return unsubscribe
  }, [tierId])

  return (
    <span
      ref={spanRef}
      className="font-mono tabular-nums"
      data-tier={tierId}
    >
      {initialText}
    </span>
  )
}
