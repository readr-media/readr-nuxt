const { SITE_TITLE, SITE_URL } = require('./constants/metadata.js')

const SITE_DESCRIPTION =
  'READr 是一個新聞媒體，致力於透過內容實驗，增加使用者的媒體識讀能力。團隊組成為工程師、設計師、記者、產品經理，多元專業背景的成員共同完成新聞的產製，並在專案中加上讀者參與的元素，讓以往封閉的新聞編輯室有開放的可能。'

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

const inDevEnv = process.env.NODE_ENV === 'development'

Object.assign(module.exports, {
  mode: 'universal',

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
      { name: 'theme-color', content: '#04295e' },
      { name: 'msapplication-TileColor', content: '#ebf02c' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#04295e' },
    ],
    script: [
      {
        hid: 'adobe-fonts',
        innerHTML: `
          (function(d) {
            var config = {
              kitId: 'icf3not',
              scriptTimeout: 3000,
              async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
          })(document);
        `,
      },
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'adobe-fonts': ['innerHTML'],
    },
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `${BASE_URL}/api/cms`,
        browserHttpEndpoint: '/api/cms',
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
  plugins: [
    '~/plugins/vue-plugins.client.js',
    '~/plugins/index.js',
    '~/plugins/index.client.js',
    '~/plugins/web-components.client.js',
  ],

  serverMiddleware: [
    '~/server/middle/header.js',
    { path: '/api/public', handler: '~/api/public.js' },
    { path: '/api/cms', handler: '~/api/cms.js' },
    { path: '/api/google-sheets', handler: '~/api/google-sheets.js' },
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

    '@nuxtjs/composition-api',
    // Doc: https://github.com/nuxt-community/analytics-module
    [
      '@nuxtjs/google-analytics',
      {
        id() {
          return /^www\.readr\.tw/i.test(document.domain)
            ? 'UA-83609754-1'
            : 'UA-83609754-2'
        },
      },
    ],
    // Doc: https://github.com/daliborgogic/nuxt-vitals
    [
      'nuxt-vitals',
      {
        trackingID: 'UA-83609754-1',
        disabled: inDevEnv,
      },
    ],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/dayjs', '@nuxtjs/apollo', '@nuxtjs/svg', 'nuxt-ssr-cache'],

  cache: !inDevEnv && {
    pages: ['/'],
    key: (route) => `readr-nuxt${route}`,
    store: {
      type: 'memory',
      max: 100,
      ttl: 60 * 5,
    },
  },

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
