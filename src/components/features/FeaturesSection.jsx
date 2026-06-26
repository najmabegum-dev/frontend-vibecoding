import { useState } from 'react'
import { features } from '../../data/features.js'
import AccordionList from './AccordionList.jsx'
import BentoGrid from './BentoGrid.jsx'

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleActivate = (index) => {
    setActiveIndex((current) => (current === index ? null : index))
  }

  return (
    <section id="features" aria-labelledby="feature-heading" className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16">
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(255,153,50,0.14),transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-forsythia">Core capabilities</p>
          <h2 id="feature-heading" className="mt-3 text-3xl font-semibold text-arctic sm:text-4xl">
            One shared control layer for resilient AI automation.
          </h2>
          <p className="mt-4 text-base leading-8 text-arctic/70 sm:text-lg">
            Desktop and mobile experiences stay connected through a single active index so the same capability stays highlighted while you switch layouts.
          </p>
        </div>

        <div className="mt-10">
          <BentoGrid features={features} activeIndex={activeIndex} onActivate={handleActivate} />
          <AccordionList features={features} activeIndex={activeIndex} onActivate={handleActivate} />
        </div>
      </div>
    </section>
  )
}
