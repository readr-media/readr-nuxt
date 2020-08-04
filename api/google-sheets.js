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
