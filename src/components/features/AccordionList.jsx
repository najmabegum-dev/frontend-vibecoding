import { useEffect, useRef, useState } from 'react'

export default function AccordionList({ features, activeIndex, onActivate }) {
  return (
    <div className="space-y-3 md:hidden">
      {features.map((feature, index) => {
        const isOpen = activeIndex === index

        return <AccordionItem key={feature.id} feature={feature} index={index} isOpen={isOpen} onToggle={() => onActivate(index)} />
      })}
    </div>
  )
}

function AccordionItem({ feature, index, isOpen, onToggle }) {
  const panelRef = useRef(null)
  const [panelHeight, setPanelHeight] = useState(0)
  const Icon = feature.icon

  useEffect(() => {
    if (panelRef.current) {
      setPanelHeight(panelRef.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/4">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/4 p-2 text-forsythia">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-forsythia">
              0{index + 1}
            </p>
            <h3 className="mt-1 text-base font-semibold text-arctic">{feature.title}</h3>
          </div>
        </div>

        <span className="text-forsythia transition-transform duration-(--dur-micro) ease-(--ease-micro)" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ⌄
        </span>
      </button>

      <div
        ref={panelRef}
        className="overflow-hidden transition-[max-height,opacity,padding] duration-(--dur-reflow) ease-(--ease-reflow)"
        style={{ maxHeight: isOpen ? `${panelHeight}px` : '0px', opacity: isOpen ? 1 : 0, paddingBottom: isOpen ? '1rem' : 0 }}
      >
        <div className="px-5 pb-2">
          <p className="text-sm leading-6 text-arctic/70">{feature.description}</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-forsythia">{feature.stat}</p>
        </div>
      </div>
    </div>
  )
}
