import { useEffect, useRef, useState } from 'react'
import { setCurrency, subscribe, getPricingState } from '../../data/pricingStore.js'
import { CURRENCIES } from '../../data/pricingMatrix.js'
import { ChevronDown } from '../icons.jsx'

/**
 * Currency dropdown. Open/closed is genuinely local UI state
 * (useState here is fine — it's the dropdown's own visibility,
 * not pricing data, and doesn't touch the pricing store or any
 * ancestor). Currency selection itself flows through the same
 * isolated store as the billing toggle.
 */
export default function CurrencySwitcher() {
  const [open, setOpen] = useState(false)
  const labelRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    return subscribe(({ currency }) => {
      if (labelRef.current) {
        labelRef.current.textContent = `${CURRENCIES[currency].symbol} ${currency}`
      }
    })
  }, [])

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const initial = getPricingState()

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-arctic/15 text-sm font-mono font-medium hover:border-forsythia/50 transition-colors duration-[var(--dur-micro)] [transition-timing-function:var(--ease-micro)]"
      >
        <span ref={labelRef}>
          {CURRENCIES[initial.currency].symbol} {initial.currency}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-[var(--dur-micro)] [transition-timing-function:var(--ease-micro)] ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-40 rounded-xl border border-arctic/10 bg-noir shadow-xl overflow-hidden z-20 animate-[dropdown-in_var(--dur-micro)_var(--ease-micro)]"
        >
          {Object.values(CURRENCIES).map((c) => (
            <li key={c.id} role="option" aria-selected={c.id === initial.currency}>
              <button
                type="button"
                onClick={() => {
                  setCurrency(c.id)
                  setOpen(false)
                }}
                className="w-full text-left px-3 py-2 text-sm font-mono hover:bg-arctic/10 transition-colors duration-[var(--dur-micro)] [transition-timing-function:var(--ease-micro)]"
              >
                {c.symbol} {c.id} <span className="opacity-60 font-sans text-xs">— {c.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
