import { defineConfig } from 'vite'
import { resolve } from 'path'

// Multi-page static site. Each page is its own HTML entry point.
export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        products: resolve(__dirname, 'products.html'),
        productsDetail: resolve(__dirname, 'products-detail.html'),
        cart: resolve(__dirname, 'cart.html'),
        login: resolve(__dirname, 'login.html'),
        register: resolve(__dirname, 'register.html'),
        contact: resolve(__dirname, 'contact.html'),
        news: resolve(__dirname, 'news.html'),
        newsDetail: resolve(__dirname, 'news-detail.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: '/index.html',
  },
})
