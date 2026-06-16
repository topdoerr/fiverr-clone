/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // TopDoerr brand palette
        cream: "#F5F4EE",
        forest: "#1C1C14",
        cobalt: "#0047AB",
        lime: "#C7F73E",
      },
      fontFamily: {
        sans: [
          "var(--font-dm-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
