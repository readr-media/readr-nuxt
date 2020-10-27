/**
 * References:
 * https://developers.google.com/sheets/api/reference/rest
 */

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const { google } = require('googleapis')

const auth = require('./middle/auth.js')

const app = new Koa()
const router = new Router()

app.use(bodyParser()).use(router.routes())

const sheets = google.sheets({
  version: 'v4',
  auth,
})

router.get('/', async function getFromGoogleSheet(ctx) {
  const sheetsRequest = ctx.query
  const { spreadsheetId } = sheetsRequest

  try {
    const { data, status = 200 } = await sheets.spreadsheets.values.get(
      sheetsRequest
    )

    ctx.status = status
    ctx.body =
      data ||
      createErrorBodyOfGoogleSheets({
        method: 'spreadsheets.values.get',
        message: 'no data found',
        spreadsheetId,
      })
  } catch (error) {
    ctx.status = 500
    ctx.body = createErrorBodyOfGoogleSheets({
      method: 'spreadsheets.values.get',
      message: error.message,
      spreadsheetId,
    })
  }
})

router.post('/append', async function appendToGoogleSheet(ctx) {
  const { body: sheetsRequest } = ctx.request
  const { spreadsheetId } = sheetsRequest

  try {
    const { data, status = 200 } = await sheets.spreadsheets.values.append(
      sheetsRequest
    )

    ctx.status = status
    ctx.body =
      data ||
      createErrorBodyOfGoogleSheets({
        method: 'spreadsheets.values.append',
        message: 'no data found',
        spreadsheetId,
      })
  } catch (error) {
    ctx.status = 500
    ctx.body = createErrorBodyOfGoogleSheets({
      method: 'spreadsheets.values.append',
      message: error.message,
      spreadsheetId,
    })
  }
})

function createErrorBodyOfGoogleSheets({ method, message, spreadsheetId }) {
  return `
    api: google sheets
    method: ${method}
    message: ${message}
    spreadsheet id: ${spreadsheetId}
  `
}

Object.assign(module.exports, {
  handler: app.callback(),
})
