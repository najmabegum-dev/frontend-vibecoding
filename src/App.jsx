import FeaturesSection from './components/features/FeaturesSection.jsx'
import PricingSection from './components/pricing/PricingSection.jsx'

const socialProof = ['Northstar AI', 'Lumen Labs', 'Apex Flow', 'Helio Cloud']

function App() {
  return (
    <div className="min-h-screen bg-noir text-arctic font-sans">
      <header className="border-b border-white/10 bg-noir/90 backdrop-blur">
        <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
          <a href="#top" className="font-mono text-sm font-semibold uppercase tracking-[0.32em] text-forsythia">
            Conduit
          </a>
          <div className="flex items-center gap-5 text-sm text-arctic/70">
            <a href="#features" className="relative transition-colors hover:text-forsythia after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[var(--color-forsythia)] after:transition-all after:duration-[var(--dur-micro)]">
              Features
            </a>
            <a href="#pricing" className="relative transition-colors hover:text-forsythia after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[var(--color-forsythia)] after:transition-all after:duration-[var(--dur-micro)]">
              Pricing
            </a>
            <a href="#footer" className="relative transition-colors hover:text-forsythia after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[var(--color-forsythia)] after:transition-all after:duration-[var(--dur-micro)]">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="relative overflow-hidden hero-bg px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
          <div className="pointer-events-none absolute top-20 left-10 h-72 w-72 rounded-full bg-[var(--color-forsythia)]/5 blur-3xl animate-[orb1_8s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute bottom-10 right-20 h-96 w-96 rounded-full bg-[var(--color-nocturnal)]/40 blur-3xl animate-[orb2_11s_ease-in-out_infinite]" />
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-2xl">
              <p className="hero-entry hero-entry-1 font-mono text-sm uppercase tracking-[0.32em] text-forsythia">
                AI data automation for modern teams
              </p>
              <h1 className="hero-entry hero-entry-2 mt-4 text-4xl font-semibold leading-tight text-arctic sm:text-5xl lg:text-6xl">
                Run multi-step workflows without the operational drag.
              </h1>
              <p className="hero-entry hero-entry-3 mt-6 text-lg leading-8 text-arctic/70">
                Connect live data, coordinate specialized agents, and keep every handoff resilient from intake to resolution.
              </p>
              <div className="hero-entry hero-entry-4 mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#features" className="inline-flex items-center justify-center rounded-full bg-forsythia px-6 py-3 font-semibold text-noir transition-transform hover:-translate-y-0.5">
                  Explore capabilities
                </a>
                <a href="#pricing" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-arctic transition-colors hover:border-forsythia/50 hover:text-forsythia">
                  View pricing
                </a>
              </div>
            </div>

            <div className="hero-entry hero-entry-5 relative rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_80px_rgba(17,76,90,0.18)]" style={{ boxShadow: '0 0 60px 0 rgba(255,200,1,0.12), 0 0 80px rgba(17,76,90,0.18)' }}>
              <div className="absolute top-6 right-6 w-2 h-2 bg-[var(--color-forsythia)] rounded-full" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-forsythia">Live orchestration</p>
                  <p className="mt-2 text-2xl font-semibold text-arctic">3.2x faster handoffs</p>
                </div>
                <div className="rounded-full border border-forsythia/30 bg-forsythia/10 px-3 py-1 text-sm text-forsythia">
                  Fast lane
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {['Connected data sources', 'Retry-aware memory', 'Human checkpoints'].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-noir/60 px-4 py-3 text-sm text-arctic/70">
                    <span>{item}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-forsythia">Ready</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="social-proof-heading" className="border-y border-white/10 bg-white/[0.03] px-6 py-8 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p id="social-proof-heading" className="font-mono text-sm uppercase tracking-[0.24em] text-arctic/60">
              Trusted by operators at
            </p>
            <ul className="flex flex-wrap gap-4 text-sm text-arctic/70">
              {socialProof.map((name) => (
                <li key={name} className="rounded-full border border-white/10 px-3 py-2">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FeaturesSection />
        <PricingSection />
      </main>

      <footer id="footer" className="border-t border-white/10 px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-arctic/60 sm:flex-row sm:items-center sm:justify-between">
          <p>Conduit • Build resilient automation experiences with clarity.</p>
          <a href="mailto:hello@conduit.ai" className="text-forsythia transition-colors hover:text-saffron">
            hello@conduit.ai
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
