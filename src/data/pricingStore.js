/**
 * ISOLATED PRICING STORE
 * ---------------------------------------------------------------
 * The brief's hardest constraint: "Changing the currency dropdown
 * or billing toggle must not re-render the parent component or
 * surrounding layout blocks... updates must be strictly isolated
 * to the localized DOM text nodes containing the price strings."
 *
 * A normal useState-at-the-top approach fails this by construction:
 * any state lift high enough for the toggle to reach all three
 * pricing cards necessarily re-renders everything below it on
 * every change, because that's how React's render model works.
 *
 * Solution: state lives OUTSIDE React, in a plain module-level
 * store with manual subscriptions. The toggle/dropdown writes to
 * the store and calls listeners directly. Each <PriceText> node
 * subscribes itself and mutates its own textContent imperatively
 * via a ref — it never calls setState, so React's reconciler
 * never touches it, the parent's render count stays at 1, and
 * Chrome DevTools' profiler will show zero re-renders on toggle/
 * currency change for every component except the leaf text node
 * itself (which isn't a React render at all — it's a raw DOM
 * mutation, invisible to the React profiler).
 */

const state = {
  cycle: 'monthly', // 'monthly' | 'annual'
  currency: 'USD',  // 'USD' | 'INR' | 'EUR'
}

const listeners = new Set()

export function getPricingState() {
  return state
}

export function setCycle(cycle) {
  state.cycle = cycle
  listeners.forEach((fn) => fn(state))
}

export function setCurrency(currency) {
  state.currency = currency
  listeners.forEach((fn) => fn(state))
}

/**
 * Subscribe to store changes. Returns an unsubscribe function.
 * Used by leaf price nodes AND by the toggle/dropdown controls
 * themselves (so the control's own active-state styling updates
 * without needing a separate React state value).
 */
export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
