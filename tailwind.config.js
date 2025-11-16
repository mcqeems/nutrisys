// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Tambahkan path di mana pun Anda menggunakan class Tailwind:
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // <-- Pastikan ini ada
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "selector",
};
