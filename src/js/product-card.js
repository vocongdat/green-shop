// Product card templates (grid + list) and renderers
import { money, priceAfterSale, starsHTML } from './utils.js'
import { icons } from './icons.js'

const img = (p) => `assets/img/product/${p.thumbnailUrl}`

export function gridCardHTML(p, i = 0) {
  const now = priceAfterSale(p.price, p.priceSale)
  const delay = `reveal-delay-${Math.min((i % 4) + 1, 5)}`
  return `
  <article class="product-card group reveal ${delay}">
    <a href="products-detail.html?id=${p.id}" class="product-media block aspect-[4/5]">
      ${p.priceSale ? `<span class="badge-sale">-${p.priceSale}%</span>` : ''}
      <img src="${img(p)}" alt="${p.name}" loading="lazy" />
      <div class="card-actions">
        <button class="icon-btn" data-buy data-id="${p.id}" aria-label="Thêm vào giỏ">${icons.cart}</button>
        <span class="icon-btn" aria-label="Yêu thích">${icons.heart}</span>
        <span class="icon-btn" aria-label="Xem nhanh">${icons.search}</span>
      </div>
    </a>
    <div class="flex flex-1 flex-col p-5">
      <div class="mb-1 flex items-center justify-between">
        ${starsHTML(5)}
        <span class="text-xs text-muted">Còn ${p.quantity}</span>
      </div>
      <h3 class="font-display text-xl font-semibold leading-snug text-forest-800">
        <a href="products-detail.html?id=${p.id}" class="transition-colors hover:text-forest-600">${p.name}</a>
      </h3>
      <div class="mt-3 flex items-end gap-2">
        <span class="price-now text-lg">${money(now)}</span>
        ${p.priceSale ? `<span class="price-old">${money(p.price)}</span>` : ''}
      </div>
      <button class="btn btn-outline mt-4 w-full" data-buy data-id="${p.id}">Thêm vào giỏ</button>
    </div>
  </article>`
}

export function listCardHTML(p, i = 0) {
  const now = priceAfterSale(p.price, p.priceSale)
  return `
  <article class="product-card group reveal !flex-row overflow-hidden">
    <a href="products-detail.html?id=${p.id}" class="product-media w-2/5 max-w-[220px] shrink-0 self-stretch">
      ${p.priceSale ? `<span class="badge-sale">-${p.priceSale}%</span>` : ''}
      <img src="${img(p)}" alt="${p.name}" loading="lazy" />
    </a>
    <div class="flex flex-1 flex-col justify-center p-6">
      <div class="mb-1.5">${starsHTML(5)}</div>
      <h3 class="font-display text-2xl font-semibold text-forest-800">
        <a href="products-detail.html?id=${p.id}" class="transition-colors hover:text-forest-600">${p.name}</a>
      </h3>
      <p class="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-muted">${p.description}</p>
      <div class="mt-4 flex items-center gap-4">
        <span class="price-now text-xl">${money(now)}</span>
        ${p.priceSale ? `<span class="price-old">${money(p.price)}</span>` : ''}
        <button class="btn btn-primary ml-auto" data-buy data-id="${p.id}">Thêm vào giỏ</button>
      </div>
    </div>
  </article>`
}

export function skeletonCards(count = 6) {
  return Array.from(
    { length: count },
    () => `
    <div class="rounded-2xl bg-ivory p-4 shadow-card">
      <div class="skeleton aspect-[4/5] w-full"></div>
      <div class="skeleton mt-4 h-4 w-3/4"></div>
      <div class="skeleton mt-2 h-4 w-1/2"></div>
      <div class="skeleton mt-4 h-9 w-full"></div>
    </div>`
  ).join('')
}
