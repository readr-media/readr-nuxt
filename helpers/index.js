import { ENV } from '../configs/config.js'

const isProdEnv = ENV === 'prod'

export { isProdEnv }

export { reportApiErrorFromKoa, logApiError, getErrorName } from './error.js'

export { SITE_TITLE, SITE_URL } from './meta.js'

export { getHref, formatDate } from './post.js'
