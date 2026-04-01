import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // next-themes gère le dark mode via data-theme — pas besoin du mode 'class' de Tailwind
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        title: ['"Bebas Neue"', 'sans-serif'],
        sans:  ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
