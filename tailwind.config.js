const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'body': '#000000',
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
