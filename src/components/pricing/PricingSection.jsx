import { TIERS } from '../../data/pricingMatrix.js'
import PricingCard from './PricingCard.jsx'
import BillingToggle from './BillingToggle.jsx'
import CurrencySwitcher from './CurrencySwitcher.jsx'

/**
 * Top-level pricing section. Renders once. BillingToggle and
 * CurrencySwitcher write to the external store directly on
 * interaction — this component itself holds no pricing state,
 * so there is nothing here for a price/currency change to
 * re-render. The PricingCards (and their PriceText/PeriodText
 * leaves) subscribe independently and update their own DOM
 * nodes; this <section> never re-renders after first paint.
 */
export default function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative py-24 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-mono text-sm text-forsythia uppercase tracking-widest">
            Pricing
          </p>
          <h2 id="pricing-heading" className="mt-3 text-3xl sm:text-4xl font-bold text-arctic">
            Simple pricing that scales with you
          </h2>
          <p className="mt-4 text-arctic/65">
            Choose your plan, billing cycle, and currency. Switching never
            reloads the page — pricing updates live.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <BillingToggle />
          <CurrencySwitcher />
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-arctic/40 font-mono">
          Prices shown in your selected currency, inclusive of regional
          adjustments. Annual billing applies a flat 20% discount.
        </p>
      </div>
    </section>
  )
}
