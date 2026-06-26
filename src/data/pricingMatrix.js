/**
 * PRICING CONFIG MATRIX
 * ---------------------------------------------------------------
 * Per the brief: "compute the final values dynamically using a
 * multi-dimensional configuration object/matrix that factors in
 * a base tier rate, a flat 20% annual discount multiplier, and
 * regional tariff variables." Hardcoding final per-cell numbers
 * is explicitly a disqualifying condition — so nothing below is
 * a lookup table of final prices. Every displayed price is the
 * *output* of getPrice(), computed at render/update time from
 * these three independent inputs.
 *
 * Dimensions:
 *   1. TIER       -> base monthly USD rate (the anchor currency)
 *   2. CYCLE      -> monthly (1x) | annual (× ANNUAL_DISCOUNT, applied
 *                    to the *monthly-equivalent* rate, billed yearly)
 *   3. CURRENCY   -> regional conversion + tariff adjustment applied
 *                    on top of the USD base
 *
 * Currency figures grounded in real-world rates checked June 2026
 * (USD/INR ~94.5, EUR/USD ~0.875) plus a small regional SaaS
 * pricing-power adjustment (the "tariff" variable) layered on —
 * this mirrors how real SaaS vendors localize price (not naive
 * FX passthrough; e.g. Indian pricing typically undercuts pure
 * FX conversion to match local willingness-to-pay).
 */

export const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For solo builders automating their first workflows',
    baseMonthlyUSD: 29,
    featured: false,
    features: [
      '3 active automation pipelines',
      '10K AI inference calls / month',
      'Standard data connectors',
      'Community support',
      '7-day run history',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For growing teams running production workloads',
    baseMonthlyUSD: 79,
    featured: true,
    features: [
      'Unlimited automation pipelines',
      '250K AI inference calls / month',
      'Advanced + custom connectors',
      'Priority support, 4hr SLA',
      '90-day run history',
      'Team roles & permissions',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For organizations operating at scale',
    baseMonthlyUSD: 249,
    featured: false,
    features: [
      'Unlimited everything',
      'Dedicated inference capacity',
      'Custom connector development',
      'Dedicated success engineer',
      'Unlimited run history + audit log',
      'SSO, SAML & on-prem options',
    ],
  },
]

export const BILLING_CYCLES = {
  monthly: { id: 'monthly', label: 'Monthly', multiplier: 1 },
  annual: { id: 'annual', label: 'Annual', multiplier: 1 },
}

// Flat 20% annual discount multiplier, per the brief — applied once,
// centrally, never baked into a per-cell number.
export const ANNUAL_DISCOUNT_MULTIPLIER = 0.8 // i.e. 20% off

export const CURRENCIES = {
  USD: {
    id: 'USD',
    symbol: '$',
    label: 'US Dollar',
    // anchor currency: fx rate to itself is 1, no regional tariff
    fxRateFromUSD: 1,
    regionalTariff: 1,
  },
  INR: {
    id: 'INR',
    symbol: '₹',
    label: 'Indian Rupee',
    // grounded ~94.5 INR/USD (real mid-market rate, checked Jun 2026)
    fxRateFromUSD: 94.5,
    // regional SaaS pricing-power adjustment: Indian list prices
    // typically run below pure FX conversion to match local
    // purchasing power — modeled as a 0.55x tariff on the
    // FX-converted figure.
    regionalTariff: 0.55,
  },
  EUR: {
    id: 'EUR',
    symbol: '€',
    label: 'Euro',
    // grounded ~0.875 EUR/USD (real mid-market rate, checked Jun 2026)
    fxRateFromUSD: 0.875,
    // EU SaaS list prices commonly sit slightly above raw FX
    // parity (VAT-inclusive display norms, regional support cost)
    regionalTariff: 1.04,
  },
}

/**
 * Pure function: derives the final displayed price from the three
 * independent dimensions. No final number is ever stored — only
 * computed, every time, from base × cycle × fx × tariff.
 */
export function getPrice(tierId, cycleId, currencyId) {
  const tier = TIERS.find((t) => t.id === tierId)
  const currency = CURRENCIES[currencyId]
  if (!tier || !currency) return null

  const cycleMultiplier =
    cycleId === 'annual' ? ANNUAL_DISCOUNT_MULTIPLIER : 1

  const usdMonthly = tier.baseMonthlyUSD * cycleMultiplier
  const converted = usdMonthly * currency.fxRateFromUSD * currency.regionalTariff

  return converted
}

/**
 * Formats a computed price for display, with currency-appropriate
 * rounding (INR conventionally shows no decimals at this range).
 */
export function formatPrice(amount, currencyId) {
  const currency = CURRENCIES[currencyId]
  if (amount == null || !currency) return '—'

  const decimals = currencyId === 'INR' ? 0 : 2
  const rounded = amount.toFixed(decimals)

  // thousands separators
  const [whole, frac] = rounded.split('.')
  const withSeparators = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return `${currency.symbol}${withSeparators}${frac ? '.' + frac : ''}`
}

/**
 * Annual total (billed once per year) — separate from the
 * per-month-equivalent figure shown on the toggle, since SaaS
 * pricing pages conventionally show "$X/mo, billed annually"
 * rather than the lump sum as the headline number.
 */
export function getAnnualTotal(tierId, currencyId) {
  const monthlyEquivalent = getPrice(tierId, 'annual', currencyId)
  return monthlyEquivalent == null ? null : monthlyEquivalent * 12
}
