/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-primary": "#181823",
        "black-secondary": "#060608",
        "gary-100": "#232b2b",
        "blue-color": "#4E4FEB",
      },
    },
  },
  plugins: [],
};
