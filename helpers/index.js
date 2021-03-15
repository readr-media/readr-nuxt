import { ENV } from '../configs/config.js'

const isProdEnv = ENV === 'prod'

export { isProdEnv }

export { reportApiErrorFromKoa, logApiError, getErrorName } from './error.js'

export { getHref, getImg, formatDate } from './post.js'
