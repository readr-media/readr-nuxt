function newline2br(str = '') {
  return String(str).replace(/\n/g, '<br />')
}

export { newline2br }
export {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
  isIntersectionObserver,
} from './intersection-observer.js'
