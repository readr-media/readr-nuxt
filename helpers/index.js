import { ENV } from '../configs/config.js'

const isProdEnv = ENV === 'prod'

export { isProdEnv }

export { reportApiErrorFromKoa, logApiError, getErrorName } from './error.js'

export { setLocalStorage, getLocalStorage } from './local-storage.js'

export { SITE_TITLE, SITE_URL } from './meta.js'

export { POINT_OBJECT_TYPE } from './point-object-type.js'

export { getHref, formatDate } from './post.js'
