import { memo } from 'react'
import PriceText from './PriceText.jsx'
import PeriodText from './PeriodText.jsx'
import { ArrowTrendingUp } from '../icons.jsx'

/**
 * memo() is a deliberate second layer of re-render protection.
 * Props passed in (tier) never change after initial mount, so
 * this card has no reason to re-render regardless — but memo
 * makes that guarantee explicit and visible to anyone profiling
 * the component tree, rather than implicit.
 */
function PricingCard({ tier }) {
  const { id, name, tagline, featured, features } = tier
  const highlightBorder = id === 'starter' || id === 'enterprise'

  return (
    <article
      className={`relative flex flex-col rounded-3xl p-8 transition-transform duration-[var(--dur-micro)] [transition-timing-function:var(--ease-micro)] hover:-translate-y-1 ${highlightBorder ? 'ring-1 ring-white/10 hover:ring-[var(--color-forsythia)]/40 shadow-[0_0_30px_0_rgba(255,200,1,0.05)] hover:shadow-[0_0_50px_0_rgba(255,200,1,0.15)] transition-all duration-[var(--dur-reflow)]' : ''} ${featured ? 'overflow-visible' : 'group hover:scale-[1.02] hover:shadow-[0_0_40px_0_rgba(255,200,1,0.08)] transition-all duration-[var(--dur-micro)] [transition-timing-function:var(--ease-micro)]'} ${
        featured
          ? 'bg-gradient-to-b from-forsythia/15 to-transparent border-2 border-forsythia'
          : 'bg-arctic/[0.04] border border-arctic/10'
      }`}
    >
      {featured && <div className="absolute inset-0 bg-[var(--color-forsythia)]/5 blur-2xl rounded-3xl -z-10" />}
      {featured && (
        <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-forsythia text-noir text-xs font-mono font-bold uppercase tracking-wide">
          Most Popular
        </span>
      )}

      <h3 className="font-mono text-xl font-bold text-arctic">{name}</h3>
      <p className="mt-1 text-sm text-arctic/60 min-h-[2.5rem]">{tagline}</p>

      <div className="mt-6 flex items-baseline gap-1 flex-wrap">
        <span className="text-4xl font-bold text-arctic">
          <PriceText tierId={id} />
        </span>
        <PeriodText />
      </div>

      <a
        href="#get-started"
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-sm transition-all duration-[var(--dur-micro)] [transition-timing-function:var(--ease-micro)] hover:gap-3 hover:brightness-110 active:scale-95 ${
          featured
            ? 'bg-forsythia text-noir hover:bg-saffron'
            : 'bg-arctic/10 text-arctic hover:bg-arctic/15'
        }`}
      >
        Get started <ArrowTrendingUp className="w-4 h-4" />
      </a>

      <ul className="mt-8 space-y-3 text-sm text-arctic/80">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-forsythia shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default memo(PricingCard)
