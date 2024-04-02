/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#9766FF',
        sub: '#E0D1FF',
        sub_light: '#F0E9FF',
        input_bg: '#ECEEEF ',
        accent: '#FF8B8B',
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
