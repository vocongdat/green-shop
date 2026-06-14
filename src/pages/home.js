import '../js/app.js'
import { getProducts, getSliceProduct } from '../data/api.js'
import { gridCardHTML } from '../js/product-card.js'
import { initReveal } from '../js/motion.js'
import { $ } from '../js/utils.js'

async function renderFeatured() {
  const wrap = $('#home-featured')
  if (!wrap) return
  const { body } = await getProducts(1, 8)
  wrap.innerHTML = body.map((p, i) => gridCardHTML(p, i)).join('')
  initReveal(wrap)
}

async function renderNewArrivals() {
  const wrap = $('#home-new')
  if (!wrap) return
  const { body } = await getSliceProduct(9, 13)
  wrap.innerHTML = body.map((p, i) => gridCardHTML(p, i)).join('')
  initReveal(wrap)
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeatured()
  renderNewArrivals()
})
