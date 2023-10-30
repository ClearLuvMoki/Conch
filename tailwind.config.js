// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./src/render/**/*.{js,jsx,ts,tsx}",
        "./packages/Think/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                PrimaryBackground: "#f3f6fd",
                PrimaryBlack: "rgb(45,46,51)",
                NoteTextColor: "rgba(55, 53, 47, 0.5)"
            }
        }
    },
    darkMode: "class",
    plugins: [
        nextui()]
};
