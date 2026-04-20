/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        // Legacy — kept until secondary page sweep (Task 8 removes these)
        primary: {
          50: '#fef6e7',
          100: '#fdecc4',
          200: '#fbd88d',
          300: '#f9c156',
          400: '#f7aa2b',
          500: '#f59300',
          600: '#d97d00',
          700: '#b66500',
          800: '#934f00',
          900: '#793f00',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // New design system tokens
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        'accent-hover': 'var(--accent-hover)',
        'bg-warm': 'var(--bg-warm)',
        'bg-card': 'var(--bg-card)',
        'text-body': 'var(--text)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: 'var(--radius)',
        'card-lg': 'var(--radius-lg)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
