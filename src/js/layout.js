// Shared header + footer, injected into every page.
import { icons } from './icons.js'
import { categories } from '../data/catalog.js'
import { updateCartBadge } from './cart.js'

const NAV = [
  { key: 'home', label: 'Trang chủ', href: 'index.html' },
  { key: 'about', label: 'Giới thiệu', href: 'index.html#about' },
  { key: 'products', label: 'Sản phẩm', href: 'products.html', dropdown: true },
  { key: 'news', label: 'Tin tức', href: 'news.html' },
  { key: 'contact', label: 'Liên hệ', href: 'contact.html' },
]

function navLink(item, current) {
  const active = item.key === current
  const base = `link-underline text-[15px] font-medium transition-colors duration-200 ${
    active ? 'text-forest-800' : 'text-forest-700/80 hover:text-forest-800'
  }`
  if (item.dropdown) {
    const cats = categories
      .map(
        (c) =>
          `<a href="products.html" class="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-forest-700/90 transition-colors hover:bg-forest-50 hover:text-forest-900">
             <span>${c.name}</span>${icons.arrowRight.replace('20', '14').replace('20', '14')}
           </a>`
      )
      .join('')
    return `
      <div class="group relative">
        <a href="${item.href}" class="${base} inline-flex items-center gap-1">${item.label}
          <span class="transition-transform duration-300 group-hover:rotate-180">${icons.chevron
            .replace('20', '16')
            .replace('20', '16')}</span>
        </a>
        <div class="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-3 pt-4 opacity-0 transition-all duration-300 ease-smooth group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          <div class="grid gap-1 rounded-2xl border border-forest-100 bg-ivory p-3 shadow-lift">
            ${cats}
          </div>
        </div>
      </div>`
  }
  return `<a href="${item.href}" class="${base}">${item.label}</a>`
}

function headerHTML(current) {
  const desktopNav = NAV.map((i) => navLink(i, current)).join('')
  const mobileNav = NAV.map(
    (i) =>
      `<a href="${i.href}" class="block border-b border-forest-100 py-3 text-lg font-medium text-forest-800">${i.label}</a>`
  ).join('')

  return `
  <!-- Announcement bar -->
  <div class="hidden bg-forest-800 text-cream/90 lg:block">
    <div class="container-x flex h-10 items-center justify-between text-[13px]">
      <div class="flex items-center gap-2">
        <span class="text-gold-400">${icons.clock.replace('20', '15').replace('20', '15')}</span>
        <span>Mở cửa 8:00 - 18:00 · Thứ Hai - Chủ Nhật</span>
      </div>
      <div class="flex items-center gap-5">
        <span class="text-cream/70">Miễn phí giao hàng cho đơn từ 500.000đ</span>
        <span class="h-3 w-px bg-cream/20"></span>
        <a href="login.html" class="transition-colors hover:text-gold-400">Đăng nhập</a>
        <a href="register.html" class="transition-colors hover:text-gold-400">Đăng ký</a>
      </div>
    </div>
  </div>

  <!-- Main nav -->
  <nav class="site-nav glass border-b border-forest-100/70 transition-all duration-300">
    <div class="container-x flex h-[72px] items-center justify-between gap-4">
      <a href="index.html" class="flex items-center gap-2.5 text-forest-700">
        <span class="text-gold-600">${icons.leaf}</span>
        <span class="font-display text-2xl font-semibold leading-none text-forest-800">Green<span class="text-gold-600">Shop</span></span>
      </a>

      <div class="hidden items-center gap-8 lg:flex">${desktopNav}</div>

      <div class="flex items-center gap-1.5">
        <button class="icon-link" aria-label="Tìm kiếm">${icons.search}</button>
        <a href="login.html" class="icon-link" aria-label="Tài khoản">${icons.user}</a>
        <a href="cart.html" class="icon-link relative" aria-label="Giỏ hàng">
          ${icons.cart}
          <span class="qnt absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold-500 px-1 text-[11px] font-bold text-forest-900 transition-all duration-300">0</span>
        </a>
        <button id="menu-toggle" class="icon-link lg:hidden" aria-label="Menu">${icons.menu}</button>
      </div>
    </div>
  </nav>

  <!-- Mobile drawer -->
  <div id="mobile-drawer" class="fixed inset-0 z-[80] hidden lg:hidden">
    <div class="drawer-backdrop absolute inset-0 bg-forest-900/40 opacity-0 transition-opacity duration-300"></div>
    <div class="drawer-panel absolute right-0 top-0 h-full w-[82%] max-w-sm translate-x-full bg-cream p-6 shadow-lift transition-transform duration-400 ease-smooth">
      <div class="mb-6 flex items-center justify-between">
        <span class="font-display text-xl font-semibold text-forest-800">Menu</span>
        <button id="menu-close" class="icon-link" aria-label="Đóng">${icons.close}</button>
      </div>
      ${mobileNav}
      <div class="mt-6 flex gap-3">
        <a href="login.html" class="btn btn-outline flex-1">Đăng nhập</a>
        <a href="register.html" class="btn btn-primary flex-1">Đăng ký</a>
      </div>
    </div>
  </div>`
}

function footerHTML() {
  const col = (title, links) => `
    <div>
      <h4 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">${title}</h4>
      <ul class="space-y-2.5 text-sm text-cream/70">
        ${links.map((l) => `<li><a href="#" class="link-underline transition-colors hover:text-cream">${l}</a></li>`).join('')}
      </ul>
    </div>`

  return `
  <footer class="bg-forest-900 text-cream">
    <!-- Newsletter -->
    <div class="border-b border-cream/10">
      <div class="container-x flex flex-col items-center gap-6 py-12 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h3 class="font-display text-3xl font-semibold text-cream">Gieo mầm cảm hứng xanh</h3>
          <p class="mt-2 max-w-md text-cream/65">Đăng ký để nhận bí quyết chăm cây và ưu đãi riêng từ Green Shop.</p>
        </div>
        <form class="flex w-full max-w-md gap-2" onsubmit="return false">
          <input type="email" placeholder="Email của bạn" class="field flex-1 !border-cream/20 !bg-cream/5 !text-cream placeholder:!text-cream/50" />
          <button class="btn btn-gold whitespace-nowrap">Đăng ký</button>
        </form>
      </div>
    </div>

    <!-- Columns -->
    <div class="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
      <div class="lg:col-span-1">
        <a href="index.html" class="flex items-center gap-2.5 text-cream">
          <span class="text-gold-400">${icons.leaf}</span>
          <span class="font-display text-2xl font-semibold">Green<span class="text-gold-400">Shop</span></span>
        </a>
        <p class="mt-4 text-sm leading-relaxed text-cream/65">Mang thiên nhiên vào không gian sống của bạn với những chậu cây cảnh được tuyển chọn tinh tế.</p>
        <div class="mt-5 flex gap-2.5">
          ${['facebook', 'instagram', 'youtube', 'twitter']
            .map(
              (n) =>
                `<a href="#" aria-label="${n}" class="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400 hover:text-forest-900">${icons[n].replace('20', '16').replace('20', '16')}</a>`
            )
            .join('')}
        </div>
      </div>
      ${col('Chính sách ưu đãi', ['Chính sách bảo hành', 'Chính sách đổi trả', 'Chính sách giao hàng', 'Chính sách trả góp'])}
      ${col('Hỗ trợ dịch vụ', ['Hướng dẫn mua hàng', 'Hướng dẫn thanh toán', 'Hệ thống cửa hàng', 'Câu hỏi thường gặp'])}
      ${col('Thông tin khách hàng', ['Tài khoản của tôi', 'Lịch sử mua hàng', 'Sản phẩm yêu thích', 'Tích điểm đổi quà'])}
      <div>
        <h4 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">Liên hệ</h4>
        <ul class="space-y-3 text-sm text-cream/70">
          <li class="flex items-start gap-2.5"><span class="mt-0.5 text-gold-400">${icons.pin.replace('20', '16').replace('20', '16')}</span> 123 Phố Vườn, Hai Bà Trưng, Hà Nội</li>
          <li class="flex items-center gap-2.5"><span class="text-gold-400">${icons.phone.replace('20', '16').replace('20', '16')}</span> 04 3786 8904 · 04 6674 2332</li>
          <li class="flex items-center gap-2.5"><span class="text-gold-400">${icons.mail.replace('20', '16').replace('20', '16')}</span> info@greenshop.vn</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-cream/10">
      <div class="container-x flex flex-col items-center justify-between gap-3 py-6 text-sm text-cream/55 sm:flex-row">
        <p>© 2026 Green Shop. Thiết kế bởi tình yêu thiên nhiên.</p>
        <p>Bảo mật · Điều khoản · Sitemap</p>
      </div>
    </div>
  </footer>`
}

function wireMobileMenu() {
  const drawer = document.getElementById('mobile-drawer')
  if (!drawer) return
  const backdrop = drawer.querySelector('.drawer-backdrop')
  const panel = drawer.querySelector('.drawer-panel')
  const open = () => {
    drawer.classList.remove('hidden')
    requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0')
      panel.classList.remove('translate-x-full')
    })
    document.body.style.overflow = 'hidden'
  }
  const close = () => {
    backdrop.classList.add('opacity-0')
    panel.classList.add('translate-x-full')
    document.body.style.overflow = ''
    setTimeout(() => drawer.classList.add('hidden'), 350)
  }
  document.getElementById('menu-toggle')?.addEventListener('click', open)
  document.getElementById('menu-close')?.addEventListener('click', close)
  backdrop.addEventListener('click', close)
}

export function renderLayout() {
  const current = document.body.dataset.page || ''
  const header = document.getElementById('site-header')
  const footer = document.getElementById('site-footer')
  if (header) header.innerHTML = headerHTML(current)
  if (footer) footer.innerHTML = footerHTML()
  wireMobileMenu()
  updateCartBadge()
}
