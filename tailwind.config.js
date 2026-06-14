/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      colors: {
        // Organic botanical luxury palette
        forest: {
          50: '#EEF3EF',
          100: '#D6E2DA',
          200: '#AEC6B7',
          300: '#82A892',
          400: '#5C8870',
          500: '#406B54',
          600: '#2F5240',
          700: '#264433',
          800: '#1E3528',
          900: '#14241B',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E6EDE6',
          200: '#CBD9CC',
          300: '#A9C0B0',
          400: '#86A491',
        },
        gold: {
          300: '#E0C887',
          400: '#D0AE5E',
          500: '#C2A14D',
          600: '#A8863A',
          700: '#8A6D2E',
        },
        cream: '#FAF7EF',
        ivory: '#FDFCF8',
        clay: '#8A6D4F',
        ink: '#1A211C',
        muted: '#566159',
      },
      fontFamily: {
        display: ['Cormorant', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20,36,27,0.04), 0 2px 8px rgba(20,36,27,0.05)',
        card: '0 4px 14px rgba(20,36,27,0.06), 0 10px 30px rgba(20,36,27,0.06)',
        lift: '0 18px 40px rgba(20,36,27,0.12)',
        glow: '0 8px 30px rgba(194,161,77,0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
        '3xl': '1.75rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        floatY: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-110%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(-110%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        floatY: 'floatY 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 1.6s linear infinite',
        spinSlow: 'spinSlow 1s linear infinite',
      },
    },
  },
  plugins: [],
}
