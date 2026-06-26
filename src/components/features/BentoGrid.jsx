export default function BentoGrid({ features, activeIndex, onActivate }) {
  const cardClasses = [
    'md:col-start-1 md:row-start-1 md:row-span-2',
    'md:col-start-2 md:row-start-1',
    'md:col-start-1 md:row-start-3',
    'md:col-start-2 md:row-start-2 md:row-span-2',
  ]

  return (
    <div className="hidden md:grid md:grid-cols-2 md:grid-rows-3 gap-4 lg:gap-5" style={{ gridAutoRows: '1fr' }}>
      {features.map((feature, index) => {
        const Icon = feature.icon
        const isActive = activeIndex === index
        const isFeatured = index === 3

        return (
          <button
            key={feature.id}
            type="button"
            className={`group relative overflow-hidden rounded-[28px] border p-6 text-left transition-all duration-[var(--dur-micro)] [transition-timing-function:var(--ease-micro)] hover:scale-[1.02] transition-transform duration-[var(--dur-micro)] ${cardClasses[index]} flex flex-col justify-between h-full ${isFeatured ? 'ring-1 ring-[var(--color-forsythia)]/30' : ''} ${
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
                <div className={`rounded-2xl border p-3 transition-colors duration-[var(--dur-micro)] group-hover:bg-[var(--color-forsythia)]/20 ${isActive ? 'border-forsythia/50 bg-forsythia/20 text-forsythia' : 'border-white/10 bg-white/4 text-mint'}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-forsythia">
                  {feature.stat}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-arctic">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-arctic/70 min-h-[3rem]">{feature.description}</p>
                {index === 0 && (
                  <div className="mt-6 flex flex-col gap-2">
                    {['Trigger','Transform','Branch','Resolve'].map((step, i) => (
                      <div key={step} className="flex items-center gap-3 rounded-md border border-white/10 px-3 py-2"
                        style={{opacity: 1 - i * 0.18}}>
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-forsythia)]" />
                        <span className="font-mono text-xs uppercase tracking-widest text-white/50">{step}</span>
                        <span className="ml-auto font-mono text-[10px] text-white/25">0{i+1}</span>
                      </div>
                    ))}
                  </div>
                )}
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

            {isFeatured && (
              <div className="mt-6 grid grid-cols-3 gap-2">
                {['Intake', 'Route', 'Handoff', 'Checkpoint', 'Retry', 'Resolve'].map((step) => (
                  <div key={step} className="rounded border border-white/10 px-2 py-1.5 text-center font-mono text-[10px] uppercase tracking-widest text-white/40">
                    {step}
                  </div>
                ))}
              </div>
            )}

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
