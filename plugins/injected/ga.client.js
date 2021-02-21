const partial = require('ramda/src/partial')

const { rafWithDebounce } = require('~/utils/index.js')

const sendGaEvtForHomeClick = partial(sendGaEvt, ['Home', 'click'])
const sendGaEvtForHomeScroll = partial(sendGaEvt, ['Home', 'scroll'])
const sendGaEvtForArticleClick = partial(sendGaEvt, ['Article', 'click'])
const sendGaEvtForArticleScroll = partial(sendGaEvt, ['Article', 'scroll'])
const sendGaEvtForLandingClick = partial(sendGaEvt, ['Landing', 'click'])
const sendGaEvtForHeaderClick = partial(sendGaEvt, ['header', 'click'])
const sendGaEvtForFooterClick = partial(sendGaEvt, ['footer', 'click'])
const sendGaEvtForUsersVisit = partial(sendGaEvt, ['users', 'visit'])

function sendGaEvt(category, action, label, value = 0) {
  this.$ga.event(category, action, label, value)
}

function listenScrollDepthForGaEvt(triggers = [], sendGaEvtMethod) {
  const totalScrollDepth = triggers.length
  let currentScrollDepth = 0

  window.addEventListener('scroll', sendGaEvtOfScrollDepth)

  function sendGaEvtOfScrollDepth() {
    rafWithDebounce(() => {
      const currentTrigger = triggers[currentScrollDepth]
      const { elem, evtFields } = currentTrigger
      const { top } = elem.getBoundingClientRect()
      const { clientHeight: viewportHeight } = document.documentElement

      if (top - viewportHeight < 0) {
        sendGaEvtMethod(...evtFields)

        currentScrollDepth += 1

        if (currentScrollDepth >= totalScrollDepth) {
          window.removeEventListener('scroll', sendGaEvtOfScrollDepth)
        }
      }
    })
  }
}

Object.assign(module.exports, {
  sendGaEvtForHomeClick,
  sendGaEvtForHomeScroll,
  sendGaEvtForArticleClick,
  sendGaEvtForArticleScroll,
  sendGaEvtForLandingClick,
  sendGaEvtForHeaderClick,
  sendGaEvtForFooterClick,
  sendGaEvtForUsersVisit,

  listenScrollDepthForGaEvt,
})
