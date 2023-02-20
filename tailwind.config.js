/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
  ],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#2979E4',
      'blue2': '#4289E8',
      'shade-blue': '#BDDAFB',
      'shade-blue2': '#E6EFFC',
      'black': '#000',
      'dark-grey': '#2a2a2a',
      'light-grey': '#e5e5e5',
      'white': '#fff',
      'red': '#b73636',
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
