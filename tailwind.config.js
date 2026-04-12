/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      colors: {
        bg: {
          primary: '#FFFFFF',
          soft: '#F7F6F2',
          green: '#F2FAF6',
          peach: '#FFF9F6',
        },
        brand: {
          green: '#0FA67A',
          'green-dark': '#0C8A66',
          terra: '#E05A38',
          amber: '#E8920D',
        },
        ink: {
          dark: '#111110',
          mid: '#4A4A42',
          light: '#7A7A70',
          muted: '#A5A098',
        },
        line: {
          DEFAULT: '#E2E0DB',
          light: '#EEECE7',
        },
      },
    },
  },
  plugins: [],
}
