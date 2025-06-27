/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // aquí busca en todos los .vue y .ts
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
