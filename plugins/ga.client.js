const { partial: rPartial } = require('ramda')

const { rafWithDebounce } = require('~/utils/index.js')

const sendGaEvtForHomeClick = rPartial(sendGaEvt, ['Home', 'click'])
const sendGaEvtForHomeScroll = rPartial(sendGaEvt, ['Home', 'scroll'])
const sendGaEvtForArticleClick = rPartial(sendGaEvt, ['Article', 'click'])
const sendGaEvtForArticleScroll = rPartial(sendGaEvt, ['Article', 'scroll'])
const sendGaEvtForLandingClick = rPartial(sendGaEvt, ['Landing', 'click'])
const sendGaEvtForHeaderClick = rPartial(sendGaEvt, ['header', 'click'])
const sendGaEvtForFooterClick = rPartial(sendGaEvt, ['footer', 'click'])
const sendGaEvtForUsersVisit = rPartial(sendGaEvt, ['users', 'visit'])

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
