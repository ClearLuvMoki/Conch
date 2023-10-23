// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/render/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        PrimaryBackground: "#f3f6fd",
      }
    }
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: "rgb(45,46,51)"
        }
      }
    }
  })]
};