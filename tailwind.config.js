/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                brandmain: 'var(--brandmain)',
                brandsub1: 'var(--brandsub1)',
                brandsub2: 'var(--brandsub2)',
                success: 'var(--success)',
                fail: 'var(--fail)',

            },
        },
    },
    plugins: [],
};
