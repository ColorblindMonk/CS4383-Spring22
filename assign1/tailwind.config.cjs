module.exports = {
    content: [
        './public/**/*.html',
        './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
    ],
    theme: {
        extend: {
            colors: {
                'bdazzled-blue':    '#3D5A80',
                'darksky-blue':     '#98C1D9',
                'light-cyan':       '#E0FBFC',
                'gunmetal':         '#293241',
                'burnt-sienna':     '#EE6C4D',
            },
        },
        fontFamily: {
            roboto:     ['Roboto, sans-serif'],
            righteous:  ['Righteous, sans-serif']
        },
        container: {
            center: true,
            padding: '3rem',
        },
    },
    plugins: [
        require('tailwindcss-textshadow'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms'),
    ]
};
