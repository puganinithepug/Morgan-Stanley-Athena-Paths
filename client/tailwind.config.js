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
            boxShadow: {
                'primary-glow': '0 0 10px rgba(111,106,168,0.6)', // #6f6aa8-ish
                'primary-glow-strong': '0 0 20px rgba(111,106,168,0.9)',
                'secondary-glow': '0 0 10px rgba(127,139,163,0.6)', // #7f8ba3-ish
                'secondary-glow-strong': '0 0 20px rgba(127,139,163,0.9)',
                'muted-glow': '0 0 10px rgba(171,155,142,0.6)', // #ab9b8e-ish
                'muted-glow-strong': '0 0 20px rgba(171,155,142,0.9)',
                'highlight-glow': '0 0 10px rgba(232,187,64,0.6)', // #e8bb40-ish
                'highlight-glow-strong': '0 0 20px rgba(232,187,64,0.9)',
                'accent-glow': '0 0 10px rgba(189,209,211,0.6)', // #bdd1d3-ish
                'accent-glow-strong': '0 0 20px rgba(189,209,211,0.9)',
                'primary-dark-glow': '0 0 10px rgba(56,54,90,0.6)', // #38365a-ish
                'primary-dark-glow-strong': '0 0 20px rgba(56,54,90,0.9)',
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
