/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4A534',
          light: '#E0B84A',
          dark: '#B8912D',
        },
        brown: {
          DEFAULT: '#5C3D2E',
          light: '#6E4D3C',
          dark: '#4A3125',
        },
        terracotta: {
          DEFAULT: '#A65E3F',
          light: '#B87050',
          dark: '#8C4F35',
        },
        tan: {
          DEFAULT: '#C4915E',
          light: '#D4A574',
          dark: '#B07D4A',
        },
        cream: {
          DEFAULT: '#FAF8F5',
          dark: '#F5F0E8',
          muted: '#EDE8E0',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
