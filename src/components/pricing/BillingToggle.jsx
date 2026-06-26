import { useEffect, useRef } from 'react'
import { setCycle, subscribe, getPricingState } from '../../data/pricingStore.js'

const ACTIVE = 'bg-forsythia text-noir'
const INACTIVE = 'text-arctic/70'

/**
 * Billing cycle toggle. Clicking writes to the store and calls
 * listeners synchronously — it does NOT setState on any ancestor,
 * so the pricing cards below never re-render as a side effect of
 * this control's own click handler running.
 *
 * The toggle's own pill-highlight position is updated the same
 * imperative way as the price text, for full consistency with the
 * isolation model (and to avoid a parent re-render even here).
 */
export default function BillingToggle() {
  const monthlyRef = useRef(null)
  const annualRef = useRef(null)
  const pillRef = useRef(null)

  useEffect(() => {
    return subscribe(({ cycle }) => {
      const isAnnual = cycle === 'annual'
      if (monthlyRef.current) {
        monthlyRef.current.className = `relative z-10 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-[var(--dur-micro)] [transition-timing-function:var(--ease-micro)] ${
          isAnnual ? INACTIVE : ACTIVE
        }`
      }
      if (annualRef.current) {
        annualRef.current.className = `relative z-10 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-[var(--dur-micro)] [transition-timing-function:var(--ease-micro)] ${
          isAnnual ? ACTIVE : INACTIVE
        }`
      }
      if (pillRef.current) {
        pillRef.current.style.transform = isAnnual
          ? 'translateX(100%)'
          : 'translateX(0%)'
      }
    })
  }, [])

  const initial = getPricingState()
  const isAnnualInit = initial.cycle === 'annual'

  return (
    <div
      className="relative inline-flex items-center bg-noir/40 border border-arctic/10 rounded-full p-1"
      role="tablist"
      aria-label="Billing cycle"
    >
      <span
        ref={pillRef}
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-forsythia transition-transform duration-[var(--dur-micro)] [transition-timing-function:var(--ease-micro)]"
        style={{ transform: isAnnualInit ? 'translateX(100%)' : 'translateX(0%)' }}
      />
      <button
        ref={monthlyRef}
        type="button"
        role="tab"
        aria-selected={!isAnnualInit}
        onClick={() => setCycle('monthly')}
        className={`relative z-10 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-[var(--dur-micro)] [transition-timing-function:var(--ease-micro)] ${
          isAnnualInit ? INACTIVE : ACTIVE
        }`}
      >
        Monthly
      </button>
      <button
        ref={annualRef}
        type="button"
        role="tab"
        aria-selected={isAnnualInit}
        onClick={() => setCycle('annual')}
        className={`relative z-10 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-[var(--dur-micro)] [transition-timing-function:var(--ease-micro)] ${
          isAnnualInit ? ACTIVE : INACTIVE
        }`}
      >
        Annual <span className="opacity-80 font-mono text-xs">−20%</span>
      </button>
    </div>
  )
}
