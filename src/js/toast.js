// Toast notifications — premium styling lives in main.css
const ICONS = {
  success:
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  info:
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  warning:
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  error:
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
}

const CLOSE =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'

function ensureContainer() {
  let c = document.getElementById('toast')
  if (!c) {
    c = document.createElement('div')
    c.id = 'toast'
    document.body.appendChild(c)
  }
  return c
}

export function toast({ title = '', message = '', type = 'success', duration = 3000 } = {}) {
  const container = ensureContainer()
  const el = document.createElement('div')
  el.className = `toast toast--${type}`
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const delay = duration / 1000
  el.style.animation = reduced
    ? 'none'
    : `slideInLeft .35s cubic-bezier(0.22,1,0.36,1), fadeOut linear .4s ${delay}s forwards`

  el.innerHTML = `
    <div class="toast__icon">${ICONS[type] || ICONS.success}</div>
    <div class="toast__body">
      <h3 class="toast__title">${title}</h3>
      <p class="toast__msg">${message}</p>
    </div>
    <div class="toast__close" role="button" aria-label="Đóng">${CLOSE}</div>`

  const remove = () => el.remove()
  const timer = setTimeout(remove, duration + 600)
  el.querySelector('.toast__close').addEventListener('click', () => {
    clearTimeout(timer)
    remove()
  })
  container.appendChild(el)
}

export default toast
