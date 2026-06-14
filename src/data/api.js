// ============================================================
// Local data API — drop-in replacement for the old remote
// endpoints. Same async shape { body, pagination } so the
// rendering layer stays identical to the original.
// ============================================================
import { products, categories } from './catalog.js'

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// tiny latency so shimmer skeletons get a moment to breathe
const wait = (ms = 220) =>
  new Promise((r) => setTimeout(r, prefersReduced ? 0 : ms))

function paginate(list, page = 1, limit = 6) {
  const start = (page - 1) * limit
  return {
    body: list.slice(start, start + limit),
    pagination: { _page: page, _limit: limit, _totalRow: list.length },
  }
}

export async function getProducts(page = 1, limit = 6) {
  await wait()
  return paginate(products, page, limit)
}

export async function getAllProducts() {
  await wait(120)
  return { body: products }
}

export async function getOneProduct(id) {
  await wait(120)
  return { body: products.filter((p) => String(p.id) === String(id)) }
}

export async function getSliceProduct(start = 1, end = 7) {
  await wait()
  // legacy semantics: 1-based start, end exclusive
  return { body: products.slice(start - 1, end - 1) }
}

export async function getProductByCategory(id, page = 1, limit = 6) {
  await wait()
  return paginate(
    products.filter((p) => String(p.categoryId) === String(id)),
    page,
    limit
  )
}

export async function getProductByPrice(gte = 0, lte = Infinity, page = 1, limit = 6) {
  await wait()
  const min = Number(gte)
  const max = lte === '' || lte == null ? Infinity : Number(lte)
  return paginate(
    products.filter((p) => p.price >= min && p.price <= max),
    page,
    limit
  )
}

export async function getProductByColor(color, page = 1, limit = 6) {
  await wait()
  return paginate(
    products.filter((p) => p.color === color),
    page,
    limit
  )
}

export async function getCategory() {
  await wait(80)
  return { body: categories }
}
