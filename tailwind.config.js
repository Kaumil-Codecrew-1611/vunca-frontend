/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.js", "./components/**/*.js", "./layouts/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
      },
      fontSize: {
        "32": "32px",
      },
      colors: {
        primary: "#8BB862",
        text: "#5D5D5D",
        gray: {
          "850": "#15202b",
        }
      }
    },
  },
  plugins: [],
}

