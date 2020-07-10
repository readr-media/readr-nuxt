export { rAFWithDebounce }

function rAFWithDebounce(func) {
  let isTicking = false

  return (function instantlySetRAFWithDebounce() {
    if (isTicking) {
      return
    }

    isTicking = true

    window.requestAnimationFrame(doFunc)

    function doFunc() {
      func()
      isTicking = false
    }
  })()
}
