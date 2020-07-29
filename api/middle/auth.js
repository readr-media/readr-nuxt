/**
 * References:
 * https://developers.google.com/sheets/api/quickstart/nodejs
 */

import { google } from 'googleapis'

import CREDENTIALS from '../../configs/google-sheets/credentials.json'
import TOKEN from '../../configs/google-sheets/token.json'

const auth = authorize(CREDENTIALS)

export default auth

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
