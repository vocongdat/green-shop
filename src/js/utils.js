// Small DOM + formatting helpers shared across pages
export const $ = (sel, ctx = document) => ctx.querySelector(sel)
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)]

export const formatNumber = (value) =>
  new Intl.NumberFormat('vi-VN').format(Math.round(Number(value) || 0))

// Legacy display format: prices stored in thousands -> "{n}.000 đ"
export const money = (thousands) => `${formatNumber(thousands)}.000 đ`

// Price after discount percentage (priceSale)
export const priceAfterSale = (price, priceSale = 0) =>
  Math.floor(price - (price * priceSale) / 100)

export const getDataLocal = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch {
    return null
  }
}

export const setDataLocal = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value))

export const getParent = (el, selector) => {
  while (el && el.parentElement) {
    el = el.parentElement
    if (el.matches?.(selector)) return el
  }
  return undefined
}

// Inline SVG star row for ratings (no emoji icons)
export const starsHTML = (count = 5) => {
  const star =
    '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'
  return `<span class="stars" aria-label="${count} sao">${star.repeat(count)}</span>`
}
