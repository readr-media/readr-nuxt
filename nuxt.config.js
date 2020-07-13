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
    babel: {
      /**
       * nuxt 預設的 babel preset 為 @nuxt/babel-preset-app
       * 詳細設定可見 https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app
       */
      presets({ envName }) {
        /**
         * 理想上，瀏覽器支援列表 CSS 與 JS 應共用一份（即 .browserslistrc）
         * 但 babel 吃 .browserslistrc 時，defaults 值會不起作用
         * 此 bug 詳細可見 https://github.com/babel/babel/issues/10867，預計在第 8 版會修復
         * 若修復完，code 記得修改成：
            const envTargets = {
              client: {}
            }
         */
        const envTargets = {
          client: {
            browsers: [
              'defaults',
              'not ie <= 11',
              'Edge >= 18',
              'Chrome >= 49',
              'Firefox >= 71',
              'Safari >= 12.1',
              'iOS >= 10.0',
              'Samsung >= 9.2',
              'Opera >= 46',
              'OperaMobile >= 12',
            ],
          },
        }

        return [
          [
            '@nuxt/babel-preset-app',
            {
              targets: envTargets[envName],
            },
          ],
        ]
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
