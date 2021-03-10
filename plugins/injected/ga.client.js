const partial = require('ramda/src/partial')

const { rafWithThrottle } = require('~/utils/index.js')

const sendGaEventForHomeClick = partial(sendGaEvent, ['Home', 'click'])
const sendGaEventForHomeScroll = partial(sendGaEvent, ['Home', 'scroll'])
const sendGaEventForArticleClick = partial(sendGaEvent, ['Article', 'click'])
const sendGaEventForArticleScroll = partial(sendGaEvent, ['Article', 'scroll'])
const sendGaEventForLandingClick = partial(sendGaEvent, ['Landing', 'click'])
const sendGaEventForHeaderClick = partial(sendGaEvent, ['header', 'click'])
const sendGaEventForFooterClick = partial(sendGaEvent, ['footer', 'click'])
const sendGaEventForUsersVisit = partial(sendGaEvent, ['users', 'visit'])

function sendGaEvent(category, action, label, value = 0) {
  this.$ga.event(category, action, label, value)
}

function listenScrollDepthForGaEvent(triggers = [], sendGaEventMethod) {
  const totalScrollDepth = triggers.length
  let currentScrollDepth = 0

  window.addEventListener('scroll', sendGaEventOfScrollDepth)

  function sendGaEventOfScrollDepth() {
    rafWithThrottle(() => {
      const currentTrigger = triggers[currentScrollDepth]
      const { elem, eventFields } = currentTrigger
      const { top } = elem.getBoundingClientRect()
      const { clientHeight: viewportHeight } = document.documentElement

      if (top - viewportHeight < 0) {
        sendGaEventMethod(...eventFields)

        currentScrollDepth += 1

        if (currentScrollDepth >= totalScrollDepth) {
          window.removeEventListener('scroll', sendGaEventOfScrollDepth)
        }
      }
    })
  }
}

Object.assign(module.exports, {
  sendGaEventForHomeClick,
  sendGaEventForHomeScroll,
  sendGaEventForArticleClick,
  sendGaEventForArticleScroll,
  sendGaEventForLandingClick,
  sendGaEventForHeaderClick,
  sendGaEventForFooterClick,
  sendGaEventForUsersVisit,

  listenScrollDepthForGaEvent,
})
