import '../js/app.js'
import {
  getProducts,
  getProductByCategory,
  getProductByPrice,
  getProductByColor,
  getCategory,
} from '../data/api.js'
import { products as allProducts, categoryCounts } from '../data/catalog.js'
import { gridCardHTML, listCardHTML, skeletonCards } from '../js/product-card.js'
import { initReveal } from '../js/motion.js'
import { $, $$ } from '../js/utils.js'

const LIMIT = 6

const state = {
  page: 1,
  layout: 'grid',
  label: 'Tất cả sản phẩm',
  fetcher: (page) => getProducts(page, LIMIT),
}

const els = {}

function renderProducts(body) {
  if (!body.length) {
    els.results.innerHTML = `
      <div class="col-span-full rounded-2xl border border-dashed border-forest-200 bg-ivory p-16 text-center">
        <p class="font-display text-2xl text-forest-700">Không tìm thấy sản phẩm</p>
        <p class="mt-2 text-muted">Hãy thử điều chỉnh bộ lọc của bạn.</p>
      </div>`
    return
  }
  const tpl = state.layout === 'grid' ? gridCardHTML : listCardHTML
  els.results.innerHTML = body.map((p, i) => tpl(p, i)).join('')
  initReveal(els.results)
}

function renderPagination(pagination) {
  const total = Math.ceil(pagination._totalRow / pagination._limit)
  if (total <= 1) {
    els.pagination.innerHTML = ''
    return
  }
  let html = ''
  for (let i = 1; i <= total; i++) {
    const active = i === state.page
    html += `<button class="page-btn ${active ? 'is-active' : ''}" data-page="${i}">${i}</button>`
  }
  els.pagination.innerHTML = html
}

async function load() {
  els.results.className = gridClass()
  els.results.innerHTML = skeletonCards(LIMIT)
  els.count.textContent = '…'
  const { body, pagination } = await state.fetcher(state.page)
  renderProducts(body)
  els.results.className = gridClass()
  renderPagination(pagination)
  els.heading.textContent = state.label
  els.count.textContent = pagination._totalRow
  els.results.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
}

function gridClass() {
  return state.layout === 'grid'
    ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'
    : 'flex flex-col gap-5'
}

function setFetcher(fetcher, label) {
  state.fetcher = fetcher
  state.label = label
  state.page = 1
  load()
}

async function renderCategorySidebar() {
  const { body } = await getCategory()
  const counts = categoryCounts()
  els.categoryList.innerHTML = body
    .map(
      (c) => `
      <li>
        <button class="filter-item" data-cat="${c.id}">
          <span>${c.name}</span>
          <span class="filter-count">${counts[c.id] || 0}</span>
        </button>
      </li>`
    )
    .join('')
}

function wireFilters() {
  // Category
  els.categoryList.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cat]')
    if (!btn) return
    setActive(btn)
    setFetcher((p) => getProductByCategory(btn.dataset.cat, p, LIMIT), btn.textContent.trim().replace(/\s+\d+$/, ''))
  })

  // Price + color filters (static in markup)
  $$('[data-gte]').forEach((btn) =>
    btn.addEventListener('click', () => {
      setActive(btn)
      setFetcher(
        (p) => getProductByPrice(btn.dataset.gte, btn.dataset.lte, p, LIMIT),
        'Theo mức giá'
      )
    })
  )
  $$('[data-color]').forEach((btn) =>
    btn.addEventListener('click', () => {
      setActive(btn)
      setFetcher((p) => getProductByColor(btn.dataset.color, p, LIMIT), 'Theo màu sắc')
    })
  )

  // Reset
  $('#filter-reset')?.addEventListener('click', () => {
    clearActive()
    setFetcher((p) => getProducts(p, LIMIT), 'Tất cả sản phẩm')
  })

  // Pagination (delegated)
  els.pagination.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-page]')
    if (!btn) return
    state.page = Number(btn.dataset.page)
    load()
  })

  // Layout toggle
  $$('[data-layout]').forEach((btn) =>
    btn.addEventListener('click', () => {
      state.layout = btn.dataset.layout
      $$('[data-layout]').forEach((b) => b.classList.toggle('is-active', b === btn))
      load()
    })
  )
}

function setActive(btn) {
  clearActive()
  btn.classList.add('is-active')
}
function clearActive() {
  $$('.filter-item.is-active, [data-gte].is-active, [data-color].is-active').forEach((b) =>
    b.classList.remove('is-active')
  )
}

document.addEventListener('DOMContentLoaded', async () => {
  els.results = $('#product-results')
  els.pagination = $('#pagination')
  els.categoryList = $('#category-list')
  els.heading = $('#results-heading')
  els.count = $('#results-count')
  if (!els.results) return
  await renderCategorySidebar()
  wireFilters()
  load()
})
