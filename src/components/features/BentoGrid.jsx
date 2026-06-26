export default function BentoGrid({ features, activeIndex, onActivate }) {
  const cardClasses = [
    'md:col-start-1',
    'md:col-start-2 md:row-start-1',
    'md:col-start-2 md:row-start-2',
    'md:col-start-2 md:row-start-3 md:row-span-2',
  ]

  return (
    <div className="hidden md:grid md:grid-cols-[1.1fr_0.9fr] gap-4 lg:gap-5" style={{ gridAutoRows: '1fr' }}>
      {features.map((feature, index) => {
        const Icon = feature.icon
        const isActive = activeIndex === index
        const isFeatured = index === 3

        return (
          <button
            key={feature.id}
            type="button"
            className={`group relative overflow-hidden rounded-[28px] border p-6 text-left transition-all duration-[var(--dur-micro)] [transition-timing-function:var(--ease-micro)] ${cardClasses[index]} flex flex-col justify-between h-full ${
              isActive
                ? 'border-forsythia/70 bg-forsythia/10 shadow-[0_0_0_1px_rgba(255,200,1,0.18)] scale-[1.01]'
                : 'border-white/10 bg-white/[0.04] hover:-translate-y-1 hover:border-forsythia/40 hover:bg-white/[0.06] focus-visible:-translate-y-1 focus-visible:border-forsythia/40'
            }`}
            onMouseEnter={() => onActivate(index)}
            onFocus={() => onActivate(index)}
            onClick={() => onActivate(index)}
            aria-pressed={isActive}
          >
            {/* Decorative, low-contrast background icon for visual texture (CSS/SVG only) */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-end pr-6 pt-6">
              <Icon className="h-20 w-20 text-forsythia/8 transform rotate-12 opacity-10" />
            </div>
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className={`rounded-2xl border p-3 ${isActive ? 'border-forsythia/50 bg-forsythia/20 text-forsythia' : 'border-white/10 bg-white/4 text-mint'}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-forsythia">
                  {feature.stat}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-arctic">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-arctic/70 min-h-[3rem]">{feature.description}</p>
              </div>

              {isFeatured && (
                <div className="mt-6 flex items-center gap-3 text-sm text-arctic/70">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-2">
                    <span className="font-mono text-[11px] text-forsythia">3 agents</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-2">
                    <span className="font-mono text-[11px] text-forsythia">12 handoffs/min</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-2">
                    <span className="font-mono text-[11px] text-forsythia">0 drops</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forsythia">
              <span>Inspect capability</span>
              <span className="text-lg transition-transform duration-[var(--dur-micro)] group-hover:translate-x-1">→</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
