import { ENV } from '../configs/config.js'

const isProdEnv = ENV === 'prod'

export { isProdEnv }
export {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
  isIntersectionObserver,
} from './intersection-observer.js'
export { reportApiErrorFromKoa, logApiError, getErrorName } from './error.js'
export { setLocalStorage, getLocalStorage } from './local-storage.js'
export { SITE_TITLE, SITE_URL } from './meta.js'
export { getHref, formatDate } from './post.js'
