import axios from 'axios'

import {
  API_PROTOCOL,
  API_HOST,
  API_PORT,
  API_TIMEOUT,
} from '../configs/config'

export default requestAPI

async function requestAPI(req, res) {
  try {
    const { data } = await axios({
      method: req.method,
      url: `${API_PROTOCOL}://${API_HOST}:${API_PORT}${req.url}`,
      data: req.method === 'GET' ? undefined : req.body,
      timeout: API_TIMEOUT,
    })

    res.end(JSON.stringify(data))
  } catch (error) {
    console.error(`Error API request: ${req.url}`)
    console.error(error)
  }
}
