module.exports = {
  purge: ['./src/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        verb: '1fr 1fr 5fr',
      },
      gridTemplateRows: {
        verb: '1fr 2fr 2fr 2fr 1fr',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
