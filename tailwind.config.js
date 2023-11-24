/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#9766FF',
        sub: '#E0D1FF',
        input_bg: '#ECEEEF ',
        accent: '#FFA5A5',
        accent_sub: '#FFECEC',
      },
      screens: {
        start: '0px',
      },
      minWidth: {
        400: '400px',
      },
    },
  },
  plugins: [],
};
