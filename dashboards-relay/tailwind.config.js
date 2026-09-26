/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        gold: '#C9A84C',
        cyan: '#00FFFF',
      },
    },
  },
  plugins: [],
};
