const partial = require('ramda/src/partial')

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

Object.assign(module.exports, {
  sendGaEventForHomeClick,
  sendGaEventForHomeScroll,
  sendGaEventForArticleClick,
  sendGaEventForArticleScroll,
  sendGaEventForLandingClick,
  sendGaEventForHeaderClick,
  sendGaEventForFooterClick,
  sendGaEventForUsersVisit,
})
