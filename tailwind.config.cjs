/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#020202',
        secondary: '#3b373b',
        background: '#e1e5eb',
      }
    },
  },
  plugins: [],
}
