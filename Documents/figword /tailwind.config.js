/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          50: '#f4f9f4',
          100: '#e5f3e5',
          200: '#cce6cc',
          300: '#a3d3a3',
          400: '#70b770',
          500: '#4c9a4c',
          600: '#397d39',
          700: '#2f642f',
          800: '#275027',
          900: '#214321',
          950: '#0f240f',
        },
        earth: {
          50: '#faf7f2',
          100: '#f3ece0',
          200: '#e5d7c0',
          300: '#d2bb97',
          400: '#be9b6f',
          500: '#af8152',
          600: '#a17046',
          700: '#865b3a',
          800: '#6d4b32',
          900: '#5a3f2b',
          950: '#302015',
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
