export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Progress lives in localStorage and audio uses the browser's voice: no server rendering needed.
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Petit Carnet — Learn French',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Learn French step by step, from A1 to B1 (CEFR).' },
        { name: 'theme-color', content: '#FFF8EF' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@400;500;600&display=swap' }
      ]
    }
  }
})
