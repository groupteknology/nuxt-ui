import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    $meta: { name: 'nuxt-ui' },

    compatibilityDate: '2025-07-15',

    devtools: { enabled: false },

    css: ['~/assets/css/main.css'],

    vite: { plugins: [tailwindcss()] },
})
