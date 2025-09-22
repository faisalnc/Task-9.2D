/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 👈 forces dark mode toggle with .dark
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
