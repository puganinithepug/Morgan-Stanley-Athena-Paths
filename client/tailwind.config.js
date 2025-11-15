/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                custom: {
                    brown: "#ab9b8e",
                    blue: "#8690a2",
                    yellow: "#d2c296",
                    mint: "#bdd1d3",
                    pale: "#e0decd",
                    lavender: "#7372a6",
                },
                background: {
                    DEFAULT: "#f6f4f0",
                    dark: "#e0decd",
                },
                foreground:{
                    DEFAULT: "#1f2430",
                    light: "#647aadff",
                },
                primary: {
                    DEFAULT: "#6f6aa8", // brand purple (tweak from your lavender)
                    dark: "#38365aff",
                    light: "#a19fd0",
                },
                secondary: "#7f8ba3", // your blue
                accent: "#bdd1d3", // mint
                highlight: "#e8bb40", // yellow
                muted: "#ab9b8e", // brownn
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
