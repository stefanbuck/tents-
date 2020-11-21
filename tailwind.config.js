/* eslint-disable import/no-extraneous-dependencies */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.{js,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        mono: [...defaultTheme.fontFamily.mono],
      },
      colors: {
        rose: colors.rose,
      },
    },
  },
  variants: {
    backgroundColor: ['even'],
  },
  plugins: [],
};
