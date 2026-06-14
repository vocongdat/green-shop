// Shared bootstrap run by every page entry point.
import '../css/main.css'
import { renderLayout } from './layout.js'
import { initMotion, initReveal } from './motion.js'
import { addToCart, updateCartBadge } from './cart.js'

// Delegate "add to cart" clicks (works for dynamically rendered cards)
function initCartActions() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-buy]')
    if (!btn) return
    e.preventDefault()
    const id = btn.dataset.id
    if (id) addToCart(id)
  })
}

export function bootstrap() {
  renderLayout()
  initCartActions()
  updateCartBadge()
  initMotion()
}

// Re-run reveal after async content renders
export { initReveal }

document.addEventListener('DOMContentLoaded', bootstrap)
