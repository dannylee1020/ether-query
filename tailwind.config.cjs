/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    // darkMode: ["class", '[data-theme="dark"]'],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/colors/themes")[
                        "[data-theme=wireframe]"
                    ],
                },
                dark: {
                    ...require("daisyui/src/colors/themes")[
                        "[data-theme=night]"
                    ],
                },
            },
        ],
    },
};
