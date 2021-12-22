const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    "./src/pages/**/*.{js,jsx,ts,tsx}", './src/styles/**/*.css'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'body': '#FFFFFF',
        rose: colors.rose,
      },
      fontFamily: {
        'merriweather': ["'Merriweather'", 'sans-serif'],
        sans: ['"Roboto"', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
