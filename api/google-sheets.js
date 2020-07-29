/**
 * References:
 * https://developers.google.com/sheets/api/reference/rest
 */

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { google } from 'googleapis'

import auth from './middle/auth.js'

const app = new Koa()

export default {
  handler: app.callback(),
}

const router = new Router()

app.use(bodyParser())
app.use(router.routes())

const sheets = google.sheets({
  version: 'v4',
  auth,
})

router.post('/append', async function appendToGoogleSheet(ctx) {
  const { body: sheetsRequest } = ctx.request
  const { spreadsheetId } = sheetsRequest
  try {
    const {
      data: { updates } = {},
      status = 200,
    } = await sheets.spreadsheets.values.append(sheetsRequest)

    ctx.status = status
    ctx.body =
      updates ||
      `
        api: google sheets
        method: append
        message: no updates found
        spreadsheet id: ${spreadsheetId}
      `
  } catch (error) {
    ctx.status = error.code
    ctx.body = `
      api: google sheets
      method: append
      message: ${error.message}
      spreadsheet id: ${spreadsheetId}
    `
  }
})
