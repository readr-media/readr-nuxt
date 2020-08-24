const { partial: rPartial } = require('ramda')

const { rafWithDebounce } = require('~/utils/index.js')

const sendGaEvtHomeClick = rPartial(sendGaEvt, ['Home', 'click'])
const sendGaEvtHomeScroll = rPartial(sendGaEvt, ['Home', 'scroll'])

Object.assign(module.exports, {
  sendGaEvtHomeClick,
  sendGaEvtHomeScroll,

  listenGaEvtScrollDepth,
})

function sendGaEvt(category, action, label, value = 0) {
  this.$ga.event(category, action, label, value)
}

function listenGaEvtScrollDepth(triggers = [], sendGaEvtMethod) {
  const totalScrollDepth = triggers.length
  let currentScrollDepth = 0

  window.addEventListener('scroll', sendGaEvtScrollDepth)

  function sendGaEvtScrollDepth() {
    rafWithDebounce(() => {
      const currentTrigger = triggers[currentScrollDepth]
      const { elem, evtFields } = currentTrigger
      const { top } = elem.getBoundingClientRect()
      const { clientHeight: viewportHeight } = document.documentElement

      if (top - viewportHeight < 0) {
        sendGaEvtMethod(...evtFields)

        currentScrollDepth += 1

        if (currentScrollDepth >= totalScrollDepth) {
          window.removeEventListener('scroll', sendGaEvtScrollDepth)
        }
      }
    })
  }
}
