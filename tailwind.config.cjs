/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Zendots: "Zen Dots, cursive",
        Inter: "Inter, sans-serif"
      },
    },
  },
  plugins: [],
};
