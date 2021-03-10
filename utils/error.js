function reportApiErrorFromKoa(err, koaCtx, { scope }) {
  const { response = {}, message } = err
  koaCtx.status = response.status || 500
  koaCtx.body = message

  logApiError(err, scope)
}

function logApiError(err = {}, scope = '') {
  const { response, config = {}, message } = err
  const { url } = config

  if (response) {
    const { status, statusText, data, headers } = response
    const { method } = config
    // eslint-disable-next-line no-console
    console.error(
      `${getApiErrorName(
        scope
      )}: statusCode=${status}, statusText=${statusText}, url=${url}, method=${method}, data=${JSON.stringify(
        data
      )}, headers=${JSON.stringify(headers)}`
    )
  } else {
    // eslint-disable-next-line no-console
    console.error(`${getErrorName()}: message=${message}, url=${url}`)
  }
}

function getApiErrorName(scope) {
  return getErrorName(scope ? `${scope} API` : 'API')
}

function getErrorName(scope = '') {
  return `[${scope || 'READr'} error]`
}

Object.assign(module.exports, {
  getErrorName,
  reportApiErrorFromKoa,
  logApiError,
})
