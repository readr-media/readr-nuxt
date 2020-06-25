export default onDemand

const existedScripts = []

function onDemand(src) {
  return loadScript

  function loadScript() {
    return new Promise((resolve, reject) => {
      const hasScriptExisted = existedScripts.includes(src)
      if (hasScriptExisted) {
        return resolve(src)
      }

      const script = document.createElement('script')
      script.addEventListener('load', () => {
        existedScripts.push(src)
        return resolve(src)
      })
      script.addEventListener('error', () =>
        reject(new Error(`Script load error for ${src}`))
      )
      script.src = src
      document.head.appendChild(script)
    })
  }
}
