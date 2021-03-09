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

export { cleanupIntersectionObserver, isIntersectionObserver }
