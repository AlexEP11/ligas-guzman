const { addDynamicIconSelectors } = require("@iconify/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flyonui/dist/js/*.js"],
    theme: {
        extend: {},
    },
    plugins: [require("flyonui"), addDynamicIconSelectors()],
    flyonui: {
        themes: ["light", "dark", "gourmet"],
    },
};
