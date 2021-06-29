module.exports = {
    purge: {
        enabled: false,
        content: ['./public/index.html', './src/**/*.svelte'],
        whitelist: ['mode-dark'],
        options: {
            defaultExtractor: content => [
                ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
                ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
            ],
        },
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        darkSelector: '.mode-dark'
    },
    variants: {
        backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
        borderColor: ['dark', 'dark-disabled', 'dark-focus', 'dark-focus-within'],
        textColor: ['dark', 'dark-hover', 'dark-active', 'dark-placeholder']
    },
    plugins: [
        require('tailwindcss-dark-mode')()
    ],
}
