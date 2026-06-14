import '../js/app.js'
import { products } from '../data/catalog.js'
import { getCart, saveCart, updateCartBadge } from '../js/cart.js'
import { Validator } from '../js/validator.js'
import { toast } from '../js/toast.js'
import { initReveal } from '../js/motion.js'
import { $, money, priceAfterSale } from '../js/utils.js'
import { icons } from '../js/icons.js'

const VAT_RATE = 10

const findProduct = (id) => products.find((p) => String(p.id) === String(id))

function lineItems() {
  return getCart()
    .map((item) => {
      const p = findProduct(item.id)
      if (!p) return null
      const unit = priceAfterSale(p.price, p.priceSale)
      return { ...p, quantity: item.quantity, unit, total: unit * item.quantity }
    })
    .filter(Boolean)
}

function rowHTML(it) {
  return `
  <div class="cart-row reveal grid grid-cols-[auto,1fr,auto] items-center gap-4 rounded-2xl bg-ivory p-4 shadow-soft sm:grid-cols-[88px,1fr,auto,auto,auto]" data-id="${it.id}">
    <a href="products-detail.html?id=${it.id}" class="block h-[88px] w-[88px] overflow-hidden rounded-xl bg-sage-50">
      <img src="assets/img/product/${it.thumbnailUrl}" alt="${it.name}" class="h-full w-full object-cover" />
    </a>
    <div class="min-w-0">
      <a href="products-detail.html?id=${it.id}" class="font-display text-lg font-semibold text-forest-800 hover:text-forest-600">${it.name}</a>
      <p class="mt-0.5 text-sm text-muted">${money(it.unit)} / cây</p>
      <button class="row-remove mt-1 inline-flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600 sm:hidden">${icons.trash.replace('20', '15').replace('20', '15')} Xóa</button>
    </div>
    <div class="hidden text-sm text-muted sm:block">${money(it.unit)}</div>
    <div class="qty" data-id="${it.id}">
      <span data-step="-1" aria-label="Giảm">${icons.minus}</span>
      <input class="quantity--input" type="number" min="1" max="${it.quantityStock || 99}" value="${it.quantity}" />
      <span data-step="1" aria-label="Tăng">${icons.plus}</span>
    </div>
    <div class="flex items-center gap-3 justify-self-end">
      <span class="row-total w-28 text-right font-semibold text-forest-700">${money(it.total)}</span>
      <button class="row-remove hidden text-muted transition-colors hover:text-rose-500 sm:inline-flex" aria-label="Xóa">${icons.trash.replace('20', '18').replace('20', '18')}</button>
    </div>
  </div>`
}

function summaryHTML(items) {
  const subtotal = items.reduce((s, it) => s + it.total, 0)
  const vat = Math.floor((subtotal * VAT_RATE) / 100)
  const total = subtotal + vat
  return `
    <div class="space-y-3 text-sm">
      <div class="flex justify-between"><span class="text-muted">Tạm tính</span><span class="font-medium text-forest-800">${money(subtotal)}</span></div>
      <div class="flex justify-between"><span class="text-muted">VAT (${VAT_RATE}%)</span><span class="font-medium text-forest-800">${money(vat)}</span></div>
      <div class="flex justify-between"><span class="text-muted">Phí vận chuyển</span><span class="font-medium text-forest-600">Miễn phí</span></div>
    </div>
    <div class="my-4 border-t border-forest-100"></div>
    <div class="flex items-end justify-between">
      <span class="font-medium text-forest-800">Tổng cộng</span>
      <span class="font-display text-3xl font-semibold text-forest-700">${money(total)}</span>
    </div>`
}

function render() {
  const items = lineItems()
  const listWrap = $('#cart-items')
  const emptyWrap = $('#cart-empty')
  const grid = $('#cart-grid')
  const summary = $('#cart-summary-body')

  updateCartBadge()

  if (!items.length) {
    grid?.classList.add('hidden')
    emptyWrap?.classList.remove('hidden')
    return
  }
  emptyWrap?.classList.add('hidden')
  grid?.classList.remove('hidden')

  listWrap.innerHTML = items.map(rowHTML).join('')
  summary.innerHTML = summaryHTML(items)
  initReveal(listWrap)
  wireRows()
}

function setQty(id, qty) {
  const cart = getCart()
  const item = cart.find((i) => String(i.id) === String(id))
  if (!item) return
  item.quantity = Math.max(1, qty)
  saveCart(cart)
  render()
}

function removeItem(id) {
  saveCart(getCart().filter((i) => String(i.id) !== String(id)))
  toast({ title: 'Đã xóa', message: 'Sản phẩm đã được xóa khỏi giỏ.', type: 'info' })
  render()
}

function wireRows() {
  $('#cart-items').querySelectorAll('.qty').forEach((wrap) => {
    const id = wrap.dataset.id
    const input = wrap.querySelector('input')
    wrap.querySelectorAll('[data-step]').forEach((btn) =>
      btn.addEventListener('click', () => {
        setQty(id, (parseInt(input.value, 10) || 1) + Number(btn.dataset.step))
      })
    )
    input.addEventListener('change', () => setQty(id, parseInt(input.value, 10) || 1))
  })
  $('#cart-items')
    .querySelectorAll('.row-remove')
    .forEach((btn) =>
      btn.addEventListener('click', (e) => removeItem(e.target.closest('[data-id]').dataset.id))
    )
}

// ---- Payment method toggle (cash / card) ----
function wirePayment() {
  const creditMount = $('#credit-field')
  const showCredit = (show) => {
    if (!creditMount) return
    creditMount.innerHTML = show
      ? `<div class="form-group">
           <label class="field-label" for="credit">Số thẻ ngân hàng</label>
           <input class="field" id="credit" name="credit" rules="required|credit" type="text" placeholder="VD: 4024 0071 ..." />
           <span class="form-message"></span>
         </div>`
      : ''
  }
  document.querySelectorAll('input[name="payment"]').forEach((radio) =>
    radio.addEventListener('change', () => showCredit(radio.value === 'card' && radio.checked))
  )
}

// ---- Checkout ----
function wireCheckout() {
  wirePayment()
  new Validator('#checkout-form', {
    onSubmit: () => {
      openModal()
    },
  })
  $('#modal-confirm')?.addEventListener('click', () => {
    saveCart([])
    updateCartBadge()
    closeModal()
    toast({ title: 'Đặt hàng thành công!', message: 'Cảm ơn bạn đã mua sắm tại Green Shop.', type: 'success' })
    setTimeout(render, 300)
  })
  $('#modal-close')?.addEventListener('click', closeModal)
  $('#modal-backdrop')?.addEventListener('click', closeModal)
}

function openModal() {
  const m = $('#order-modal')
  m.classList.remove('hidden')
  requestAnimationFrame(() => {
    m.querySelector('.modal-backdrop').classList.remove('opacity-0')
    m.querySelector('.modal-card').classList.remove('translate-y-6', 'opacity-0')
  })
  document.body.style.overflow = 'hidden'
}
function closeModal() {
  const m = $('#order-modal')
  if (!m) return
  m.querySelector('.modal-backdrop').classList.add('opacity-0')
  m.querySelector('.modal-card').classList.add('translate-y-6', 'opacity-0')
  document.body.style.overflow = ''
  setTimeout(() => m.classList.add('hidden'), 300)
}

document.addEventListener('DOMContentLoaded', () => {
  if (!$('#cart-items')) return
  render()
  wireCheckout()
})
