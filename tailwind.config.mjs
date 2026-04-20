/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
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
