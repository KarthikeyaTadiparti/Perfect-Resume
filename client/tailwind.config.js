/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "pri-blue": "#004E98",
                "dark-pri-blue": "#02417b",
                background: "#F8F8F8",
            },
        },
    },
    plugins: [],
};
