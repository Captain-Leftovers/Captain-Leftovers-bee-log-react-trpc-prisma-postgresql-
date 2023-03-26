/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './src/**/*.{js,jsx,ts,tsx}', './index.html' ],
  theme: {
    extend: {
      colors: {
        primary: '#1e88e5',
        secondary: '#ff5722',
        success: '#4caf50',
        info: '#2196f3',
        warning: '#ff9800',
      }
    },
  },
  plugins: [],
}
