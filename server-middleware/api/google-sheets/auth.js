/**
 * References:
 * https://developers.google.com/sheets/api/quickstart/nodejs
 */

const { google } = require('googleapis')

const CREDENTIALS = require('../../../configs/credentials.json')
const TOKEN = require('../../../configs/token.json')

const auth = authorize(CREDENTIALS)

function authorize(credentials) {
  const {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uris: redirectUris,
  } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUris[0]
  )
  oAuth2Client.setCredentials(TOKEN)

  return oAuth2Client
}

module.exports = auth
