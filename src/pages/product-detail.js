import '../js/app.js'
import { getOneProduct } from '../data/api.js'
import { products } from '../data/catalog.js'
import { gridCardHTML } from '../js/product-card.js'
import { initReveal } from '../js/motion.js'
import { addToCart, getCart } from '../js/cart.js'
import { $, money, priceAfterSale, starsHTML } from '../js/utils.js'
import { icons } from '../js/icons.js'

function detailHTML(p) {
  const now = priceAfterSale(p.price, p.priceSale)
  const inCart = getCart().find((i) => String(i.id) === String(p.id))
  const qty = inCart ? inCart.quantity : 1
  const feature = (icon, text) =>
    `<div class="flex items-center gap-2 text-sm text-muted"><span class="text-forest-500">${icons[icon].replace('20', '18').replace('20', '18')}</span>${text}</div>`

  return `
  <div class="grid gap-10 lg:grid-cols-2">
    <div class="reveal">
      <div class="group relative overflow-hidden rounded-3xl bg-sage-50 shadow-card">
        ${p.priceSale ? `<span class="badge-sale text-sm">-${p.priceSale}%</span>` : ''}
        <img src="assets/img/product/${p.thumbnailUrl}" alt="${p.name}"
             class="aspect-square w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105" />
      </div>
      <div class="mt-4 grid grid-cols-4 gap-3">
        ${['truck', 'shield', 'sprout', 'leaf']
          .map(
            (ic, n) => `
          <div class="flex flex-col items-center gap-1.5 rounded-2xl bg-ivory p-3 text-center shadow-soft">
            <span class="text-gold-600">${icons[ic].replace('20', '22').replace('20', '22')}</span>
            <span class="text-[11px] font-medium text-forest-700">${['Giao nhanh', 'Bảo hành', 'Cây khỏe', 'Tự nhiên'][n]}</span>
          </div>`
          )
          .join('')}
      </div>
    </div>

    <div class="reveal reveal-delay-1">
      <nav class="mb-3 text-sm text-muted">
        <a href="index.html" class="hover:text-forest-700">Trang chủ</a> /
        <a href="products.html" class="hover:text-forest-700">Sản phẩm</a> /
        <span class="text-forest-700">${p.name}</span>
      </nav>
      <h1 class="font-display text-4xl font-semibold leading-tight text-forest-800 sm:text-5xl">${p.name}</h1>
      <div class="mt-3 flex items-center gap-3">
        ${starsHTML(5)}
        <span class="text-sm text-muted">(128 đánh giá)</span>
        <span class="text-forest-500">·</span>
        <span class="text-sm font-medium text-forest-600">Còn ${p.quantity} sản phẩm</span>
      </div>

      <div class="mt-6 flex items-end gap-4">
        <span class="font-display text-4xl font-semibold text-forest-700">${money(now)}</span>
        ${p.priceSale ? `<span class="price-old text-lg">${money(p.price)}</span>` : ''}
      </div>

      <p class="mt-5 max-w-xl leading-relaxed text-muted">${p.description}</p>

      <div class="mt-6 space-y-2.5 border-y border-forest-100 py-5">
        ${feature('check', 'Cây được tuyển chọn, giao kèm chậu và hướng dẫn chăm sóc')}
        ${feature('truck', 'Giao hàng nội thành trong 24h, đóng gói chống sốc')}
        ${feature('shield', 'Đổi cây mới nếu hư hỏng trong 7 ngày đầu')}
      </div>

      <div class="mt-6 flex flex-wrap items-center gap-4">
        <div class="qty" id="detail-qty">
          <span data-step="-1" aria-label="Giảm">${icons.minus}</span>
          <input class="quantity--input" type="number" min="1" max="${p.quantity}" value="${qty}" />
          <span data-step="1" aria-label="Tăng">${icons.plus}</span>
        </div>
        <button id="detail-buy" class="btn btn-primary px-9" data-id="${p.id}">
          ${icons.cart.replace('20', '18').replace('20', '18')} Thêm vào giỏ
        </button>
        <button class="icon-btn !h-12 !w-12" aria-label="Yêu thích">${icons.heart}</button>
      </div>

      <p class="mt-5 text-sm text-muted">Danh mục:
        <a href="products.html" class="font-medium text-forest-700 hover:text-gold-600">Cây cảnh trang trí</a>
      </p>
    </div>
  </div>`
}

function wireQty(max) {
  const wrap = $('#detail-qty')
  if (!wrap) return
  const input = wrap.querySelector('input')
  wrap.querySelectorAll('[data-step]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const step = Number(btn.dataset.step)
      let v = (parseInt(input.value, 10) || 1) + step
      v = Math.max(1, Math.min(v, max))
      input.value = v
    })
  )
  $('#detail-buy')?.addEventListener('click', (e) => {
    const id = e.currentTarget.dataset.id
    const q = Math.max(1, parseInt(input.value, 10) || 1)
    addToCart(id, q, { redirect: true })
  })
}

async function renderRelated(p) {
  const wrap = $('#related-products')
  if (!wrap) return
  const related = products.filter((x) => x.categoryId === p.categoryId && x.id !== p.id).slice(0, 4)
  const pool = related.length ? related : products.filter((x) => x.id !== p.id).slice(0, 4)
  wrap.innerHTML = pool.map((x, i) => gridCardHTML(x, i)).join('')
  initReveal(wrap)
}

document.addEventListener('DOMContentLoaded', async () => {
  const root = $('#product-detail')
  if (!root) return
  const id = new URLSearchParams(location.search).get('id') || products[0].id
  const { body } = await getOneProduct(id)
  const product = body[0] || products[0]
  document.title = `${product.name} · Green Shop`
  root.innerHTML = detailHTML(product)
  initReveal(root)
  wireQty(product.quantity)
  renderRelated(product)
})
