const isInBrowser = typeof window === 'object'
const doesSupportIntersectionObserver =
  isInBrowser &&
  'IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window &&
  'intersectionRatio' in window.IntersectionObserverEntry.prototype

async function setupIntersectionObserver(callback, options) {
  if (!doesSupportIntersectionObserver) {
    await import('intersection-observer')
  }

  return new IntersectionObserver(callback, options)
}

function cleanupIntersectionObserver(obj, prop) {
  if (!isIntersectionObserver(obj[prop])) {
    // eslint-disable-next-line no-console
    console.warn('[READr warn]: Not a valid Intersection Observer.')
    return
  }

  obj[prop].disconnect()
  obj[prop] = undefined
}

function isIntersectionObserver(value) {
  return value instanceof IntersectionObserver
}

if (doesSupportIntersectionObserver) {
  /**
   * Minimal polyfill for Edge 15's lack of `isIntersecting`
   * See: https://github.com/w3c/IntersectionObserver/issues/211
   */
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(
      window.IntersectionObserverEntry.prototype,
      'isIntersecting',
      {
        get() {
          return this.intersectionRatio > 0
        },
      }
    )
  }
}

export {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
  isIntersectionObserver,
}
