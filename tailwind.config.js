import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
    theme: {
        extend: {
            backgroundImage: {
                nv: "url('/no-valido.png')",
            },
        },
        fontFamily: {
            robotoMono: ["Roboto Mono", "sans-serif"],
            default: ["ui-sans-serif, system-ui, sans-serif"],
        },
    },
    plugins: [flowbite.plugin()],
};
