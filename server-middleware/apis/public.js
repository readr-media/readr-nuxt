/**
 * 向外暴露的 API，讓其它專案可以使用，比如專題底下的「更多專題」區塊：https://github.com/readr-media/readr-ui/blob/web-components/src/components/readr-latest-coverages/readr-latest-coverages.tsx#L13
 * 應限制使用者能查詢的資料
 */

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const { post: axiosPost } = require('axios')
const { reportApiErrorFromKoa } = require('../../helpers/index.js')
const { CMS_ENDPOINT } = require('../../configs/config.js')
const { handleKoaCors: handleCors } = require('./helpers/cors.js')

const app = new Koa()
const router = new Router()

app.use(handleCors).use(bodyParser()).use(router.routes())

router.post('/posts', async function requestGraphqlApi(ctx) {
  const { sort = 'publishTime_DESC', maxResult = 4 } = ctx.request.query

  const gqlPostRequest = {
    operationName: null,
    query:
      'query {\n' +
      '  latestPosts: allPosts(\n' +
      `    first: ${maxResult}\n` +
      '    where: {state: published, style_in: [news, report, embedded, project3]}\n' +
      `    sortBy: [${sort}]\n` +
      '  ) {\n' +
      '    id\n' +
      '    slug\n' +
      '    title: name\n' +
      '    style\n' +
      '    heroImage {\n' +
      '      urlMobileSized\n' +
      '      urlTabletSized\n' +
      '      __typename\n' +
      '    }\n' +
      '    ogImage {\n' +
      '      urlTabletSized\n' +
      '      __typename\n' +
      '    }\n' +
      '    publishTime\n' +
      '    readingTime\n' +
      '    __typename\n' +
      '  }\n' +
      '}\n',
  }

  try {
    const { data, status = 200 } = await axiosPost(CMS_ENDPOINT, gqlPostRequest)

    ctx.status = status
    ctx.body = data
  } catch (err) {
    reportCmsApiError(err, ctx)
  }
})

function reportCmsApiError(err, koaCtx) {
  reportApiErrorFromKoa(err, koaCtx, { scope: 'CMS' })
}

Object.assign(module.exports, {
  handler: app.callback(),
})
