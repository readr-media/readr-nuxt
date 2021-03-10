Object.assign(module.exports, {
  rafWithThrottle,
})

function rafWithThrottle(func) {
  let isTicking = false

  return (function immediatelySetRafWithThrottle() {
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
