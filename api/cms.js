import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { post as axiosPost } from 'axios'

import { CMS_ENDPOINT } from '../configs/config.js'

const app = new Koa()

export default {
  handler: app.callback(),
}

const router = new Router()

app.use(bodyParser()).use(router.routes())

router.post('/', async function requestGraphqlApi(ctx) {
  try {
    const { data, status = 200 } = await axiosPost(
      CMS_ENDPOINT,
      ctx.request.body
    )

    ctx.status = status
    ctx.body = data
  } catch (error) {
    ctx.status = 500
    ctx.body = error.message
  }
})
