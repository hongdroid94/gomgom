/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.ts.html", "./node_modules/primereact/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
                cogreen: 'var(--cogreen)',
                copink: 'var(--copink)',
                coyellow: 'var(--coyellow)',
                cowhite: 'var(--cowhite)',
                coblue:'var(--coblue)',
                third:'var(--third)',
            },
        },
    },
    plugins: [],
}

