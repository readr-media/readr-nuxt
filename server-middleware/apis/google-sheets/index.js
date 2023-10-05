/**
 * 主要處理與 Google Sheets API 相關的邏輯
 * Google Sheets API 需要認證，認證檔案是機密資料，因此必須透過 Nuxt 伺服器去打
 *
 * References:
 * https://developers.google.com/sheets/api/reference/rest
 */

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const { google } = require('googleapis')

const { reportApiErrorFromKoa } = require('../../../helpers/index.js')
const auth = require('./auth.js')

const app = new Koa()
const router = new Router()

app.use(bodyParser()).use(router.routes())

const sheets = google.sheets({
  version: 'v4',
  auth,
})

router.get('/', async function getFromGoogleSheet(ctx) {
  const sheetsRequest = ctx.query

  try {
    const { data, status = 200 } = await sheets.spreadsheets.values.get(
      sheetsRequest
    )

    ctx.status = status
    ctx.body = data
  } catch (err) {
    reportGoogleSheetsApiError(err, ctx)
  }
})

router.post('/append', async function appendToGoogleSheet(ctx) {
  const { body: sheetsRequest } = ctx.request

  try {
    const { data, status = 200 } = await sheets.spreadsheets.values.append(
      sheetsRequest
    )

    ctx.status = status
    ctx.body = data
  } catch (err) {
    reportGoogleSheetsApiError(err, ctx)
  }
})

function reportGoogleSheetsApiError(err, koaCtx) {
  reportApiErrorFromKoa(err, koaCtx, { scope: 'Google Sheets' })
}

Object.assign(module.exports, {
  handler: app.callback(),
})
