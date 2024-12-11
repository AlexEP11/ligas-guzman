const { addDynamicIconSelectors } = require("@iconify/tailwind");
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flyonui/dist/js/*.js", flowbite.content()],
    theme: {
        extend: {},
    },
    plugins: [require("flyonui"), addDynamicIconSelectors(), flowbite.plugin()],
    flyonui: {
        themes: ["light", "dark", "gourmet"],
    },
};
