/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                background: '#2c2c2c',
                formBackground: '#403f3f',
            },
            fontFamily: {
                sans: ['Consolas', 'monaco', 'monospace'],
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '50%': { opacity: '0.5' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-in forwards',
            },
        },
    },
    plugins: [],
};
