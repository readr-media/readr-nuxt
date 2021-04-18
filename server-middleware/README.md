# Server-middleware

**自己創建的資料夾，專門放與伺服器中介軟體相關的程式碼。**

需搭配 [nuxt.config.js 的 `serverMiddleware` 屬性](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware)一起使用：

```javascript
{
  serverMiddleware: [
    '~/server-middleware/header.js',
    { path: '/api/cms', handler: '~/server-middleware/apis/cms.js' },
  ],
}
```

當瀏覽器發出對 `/api/cms` 的請求（這個請求目前放在 [nuxt.config.js 的 `apollo` 屬性](https://github.com/nuxt-community/apollo-module#2--load-nuxtjsapollo-module)），便會調用 `~/server-middleware/apis/cms.js`。如果你沒有指定 `path`，那就是任何對伺服器的請求都會通過這層中介軟體。

## 資料夾結構

```
└── apis/
```

本專案有許多資料需靠打 API 取得，故特別獨立出一個 [apis 資料夾](./apis/)來管理。

## apis 資料夾

請見 [server-middleware/apis/README.md](./api/README.md)。
