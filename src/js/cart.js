// Cart state — preserves the legacy localStorage schema:
// key "productID" -> [{ id, quantity }]
import { getDataLocal, setDataLocal, $$ } from './utils.js'
import { toast } from './toast.js'

const KEY = 'productID'

export const getCart = () => getDataLocal(KEY) || []
export const saveCart = (cart) => setDataLocal(KEY, cart)

export function cartItemCount() {
  return getCart().length
}

export function updateCartBadge() {
  const count = cartItemCount()
  $$('.qnt').forEach((el) => {
    el.textContent = count
    el.classList.toggle('opacity-0', count === 0)
    el.classList.toggle('scale-0', count === 0)
  })
}

// Spring-pop the cart badge (called when an item is added)
export function popCartBadge() {
  $$('.qnt').forEach((el) => {
    el.classList.remove('pop')
    // reflow so the animation can retrigger
    void el.offsetWidth
    el.classList.add('pop')
  })
}

export function addToCart(id, quantity = 1, { redirect = false } = {}) {
  id = String(id)
  const cart = getCart()
  const existing = cart.find((item) => String(item.id) === id)
  if (existing) {
    existing.quantity = quantity > 1 ? quantity : existing.quantity + 1
  } else {
    cart.push({ id, quantity: Math.max(1, quantity) })
  }
  saveCart(cart)
  updateCartBadge()
  popCartBadge()
  toast({
    title: 'Đã thêm vào giỏ',
    message: 'Sản phẩm đã được thêm vào giỏ hàng của bạn.',
    type: 'success',
  })
  if (redirect) {
    setTimeout(() => (window.location.href = './cart.html'), 550)
  }
}

// Expose globally for any inline handlers / cross-module use
if (typeof window !== 'undefined') window.addToCart = addToCart
