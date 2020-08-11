const SITE_TITLE = 'READr 讀+'
const SITE_DESCRIPTION =
  'READr 是一個新聞媒體，致力於透過內容實驗，增加使用者的媒體識讀能力。團隊組成為工程師、設計師、記者、產品經理，多元專業背景的成員共同完成新聞的產製，並在專案中加上讀者參與的元素，讓以往封閉的新聞編輯室有開放的可能。'
const SITE_URL = 'https://www.readr.tw'

const metaOg = [
  { hid: 'og:title', property: 'og:title', content: SITE_TITLE },
  {
    hid: 'og:description',
    property: 'og:description',
    content: SITE_DESCRIPTION,
  },
  { hid: 'og:image', property: 'og:image', content: `${SITE_URL}/og.jpg` },
  { hid: 'og:url', property: 'og:url', content: SITE_URL },
  { hid: 'og:type', property: 'og:type', content: 'website' },
  { hid: 'og:site_name', property: 'og:site_name', content: SITE_TITLE },
  { hid: 'og:locale', property: 'og:locale', content: 'zh_TW' },
]

const metaFb = [
  { hid: 'fb:app_id', property: 'fb:app_id', content: '175313259598308' },
  { hid: 'fb:pages', property: 'fb:pages', content: '1855418728011324' },
]

const metaTwitter = [
  { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
  { hid: 'twitter:site', name: 'twitter:site', content: '@READr_news' },
]

const BASE_URL = 'http://localhost:3000'

Object.assign(module.exports, {
  mode: 'universal',
  modern: 'server',

  env: {
    BASE_URL,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: SITE_TITLE,
    htmlAttrs: {
      lang: 'zh-Hant',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: SITE_DESCRIPTION },
      ...metaOg,
      ...metaFb,
      ...metaTwitter,
      { hid: 'theme-color', name: 'theme-color', content: '#04295e' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `${BASE_URL}/cms`,
        browserHttpEndpoint: '/cms',
      },
    },
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/css/base.css', '~/css/readr.scss', '~/css/buttons.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/index.js', '~/plugins/requests/index.js'],

  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' },
    { path: '/cms', handler: '~/api/cms.js' },
    { path: '/google-sheets', handler: '~/api/google-sheets.js' },
  ],
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
  modules: ['@nuxtjs/dayjs', '@nuxtjs/apollo', '@nuxtjs/svg'],

  components: ['~/components', { path: '~/components/ui/', prefix: 'ui' }],

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
              corejs: { version: 3, proposals: true },
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
})
