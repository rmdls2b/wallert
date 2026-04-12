/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Sans', 'sans-serif'],
      },
      colors: {
        bg: {
          primary: '#FFFFFF',
          cream: '#F7F6F2',
          mint: '#F2FAF6',
          peach: '#FFF9F6',
        },
        brand: {
          green: '#0FA67A',
          terracotta: '#E05A38',
          amber: '#E8920D',
        },
        ink: {
          title: '#1A1A17',
          body: '#3A3A35',
          muted: '#6B6B63',
          faint: '#A09F95',
        },
        line: {
          DEFAULT: '#E8E6DE',
          strong: '#D5D2C8',
        },
      },
    },
  },
  plugins: [],
}
