/** @type {import('tailwindcss').Config} */
const daisy = require('daisyui');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111015',
        secondary: '#212129',
        tertiary: '#f3de88',
        quaternary: '#c49a6c',
        quintenary: '#a29264',
        sextenary: '#51472e',
        septenary: '#c32334',
        octonary: '#f83e55',
      },
    },
  },
  plugins: [daisy],
  daisyui: {
    styled: true,
    themes: true,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    prefix: 'daisy-',
    darkTheme: 'dark',
  },
};
