/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Satoshi: "Satoshi, sans-serif",
      },
      width: {
        fullscreen: "1512px",
      },
    },
  },
  plugins: [],
};
