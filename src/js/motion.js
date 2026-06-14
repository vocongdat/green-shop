// Lightweight, dependency-free motion system.
// - Scroll reveal via IntersectionObserver (GPU-friendly, throttled by the browser)
// - Sticky header state on scroll
// - Subtle parallax for tagged elements
// Everything degrades gracefully and respects prefers-reduced-motion.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initReveal(root = document) {
  const items = [...root.querySelectorAll('.reveal')]
  if (!items.length) return
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'))
    return
  }
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )
  items.forEach((el) => io.observe(el))
}

export function initHeaderScroll() {
  const header = document.getElementById('site-header')
  if (!header) return
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add('is-scrolled')
    else header.classList.remove('is-scrolled')
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

export function initParallax() {
  if (reduced) return
  const layers = [...document.querySelectorAll('[data-parallax]')]
  if (!layers.length) return
  let ticking = false
  const update = () => {
    const y = window.scrollY
    layers.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.15
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`
    })
    ticking = false
  }
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    },
    { passive: true }
  )
}

// Count-up animation for stat numbers (data-count="1200")
export function initCounters() {
  const els = [...document.querySelectorAll('[data-count]')]
  if (!els.length) return
  if (reduced || !('IntersectionObserver' in window)) {
    els.forEach((el) => (el.textContent = el.dataset.count))
    return
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const el = entry.target
      const target = parseFloat(el.dataset.count)
      const suffix = el.dataset.suffix || ''
      const dur = 1400
      const start = performance.now()
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.floor(eased * target).toLocaleString('vi-VN') + suffix
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
      obs.unobserve(el)
    })
  }, { threshold: 0.5 })
  els.forEach((el) => io.observe(el))
}

// Magnetic pull on tagged elements (primary CTAs). The element eases
// toward the cursor, then springs back on leave — a quiet tactile touch.
export function initMagnetic(root = document) {
  if (reduced) return
  const els = [...root.querySelectorAll('[data-magnetic]')]
  els.forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic) || 0.28
    el.addEventListener('pointerenter', () => (el.style.transition = 'transform 0.12s ease-out'))
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left - r.width / 2
      const y = e.clientY - r.top - r.height / 2
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    })
    el.addEventListener('pointerleave', () => {
      el.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
      el.style.transform = ''
    })
  })
}

export function initMotion() {
  initHeaderScroll()
  initReveal()
  initParallax()
  initCounters()
  initMagnetic()
}
