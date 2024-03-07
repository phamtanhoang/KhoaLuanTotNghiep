/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orangetext: "#f2994a",
        orangebackground: "#ffefe2",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
