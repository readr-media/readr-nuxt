export default onDemand

function onDemand(src) {
  return loadScript

  function loadScript(
    success,
    error = () => {
      console.error(`Error loading: ${src}`)
    }
  ) {
    const hasScriptExsited = document.querySelector(`[src="${src}"]`)
    if (hasScriptExsited) {
      success()
      return
    }

    const script = document.createElement('script')
    script.addEventListener('load', success)
    script.addEventListener('error', error)
    script.src = src
    document.head.appendChild(script)
  }
}
