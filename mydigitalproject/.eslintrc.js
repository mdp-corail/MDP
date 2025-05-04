module.exports = {
    extends: [
        'next/core-web-vitals',
        'plugin:prettier/recommended', // ⬅️ ADD THIS LINE
    ],
    plugins: ['prettier'], // ⬅️ ADD THIS LINE (if not present)
    rules: {
        // Your custom ESLint rules
    },
};
