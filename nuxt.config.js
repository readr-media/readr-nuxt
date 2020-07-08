module.exports = {
  mode: 'universal',
  modern: 'server',

  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/css/base.css', '~/css/readr.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/index.js', '~/plugins/requests/index.js'],

  serverMiddleware: [{ path: '/api', handler: '~/api/index.js' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',

    'nuxt-composition-api',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/dayjs'],

  components: true,

  telemetry: {
    enabled: true,
    consent: true,
  },

  styleResources: {
    scss: '~/scss/**/*.scss',
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
