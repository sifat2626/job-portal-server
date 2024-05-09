/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: "'Lato', sans-serif",
      },
      colors: {
        "light-pink": "#FDF3E7",
      },
    },
  },
  plugins: [require("daisyui")],
};
