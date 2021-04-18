/* eslint-disable import/no-extraneous-dependencies */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
    },
    extend: {
      gridTemplateColumns: {
        verb: '1fr 1fr 5fr 50px',
      },
      gridTemplateRows: {
        verb: '50px 2fr 2fr 2fr 1fr',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
