# Green Shop 🌿

Premium botanical e-commerce, rebuilt to a production-ready standard with **Vite + Tailwind CSS + vanilla ES modules**.

## Design

Organic botanical luxury — deep forest green & sage, warm cream/ivory surfaces, brass-gold accents.
Typography: **Cormorant** (display serif) + **Montserrat** (UI). Lightweight, dependency-free motion
(IntersectionObserver scroll-reveal, parallax, count-ups) that respects `prefers-reduced-motion`.

## Run

```bash
npm install          # first time
npm run dev          # dev server at http://localhost:5173
npm run build        # production build -> dist/
npm run preview      # preview the production build
```

> If `npm install` hits a cache permission error, use: `npm install --cache ./.npm-cache`

## Structure

```
*.html                 # 9 pages (home, products, detail, cart, login, register, contact, news, news-detail)
public/assets/         # images (served as-is)
src/
  css/main.css         # design tokens + Tailwind layers + components
  data/catalog.js      # local product + category data (replaces the old remote API)
  data/api.js          # async data layer (same shape the UI expects)
  js/                  # layout, cart, motion, toast, validator, product cards, icons
  pages/               # one entry module per page
```

## Notes

- **Local data:** the original site fetched products from `congdat.herokuapp.com`, which is offline.
  Data now ships locally in `src/data/catalog.js`, so the shop is fully self-contained and works offline.
- **Preserved behaviour:** cart uses the legacy `localStorage` key `productID` (`[{id, quantity}]`),
  10% VAT, category/price/color filters, pagination, the same validation rules, and toast notifications.
- All UI copy is standardized to Vietnamese.
