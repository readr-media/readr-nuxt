const bind = require('ramda/src/bind')

const {
  sendGaEventForHomeClick,
  sendGaEventForHomeScroll,
  sendGaEventForArticleClick,
  sendGaEventForArticleScroll,
  sendGaEventForLandingClick,
  sendGaEventForHeaderClick,
  sendGaEventForFooterClick,
  sendGaEventForUsersVisit,
  listenScrollDepthForGaEvent,
} = require('./ga.client.js')

module.exports = injectAllMethods

function injectAllMethods(ctx, inject) {
  inject('sendGaEventForHomeClick', bind(sendGaEventForHomeClick, ctx))
  inject('sendGaEventForHomeScroll', bind(sendGaEventForHomeScroll, ctx))
  inject('sendGaEventForArticleClick', bind(sendGaEventForArticleClick, ctx))
  inject('sendGaEventForArticleScroll', bind(sendGaEventForArticleScroll, ctx))
  inject('sendGaEventForLandingClick', bind(sendGaEventForLandingClick, ctx))
  inject('sendGaEventForHeaderClick', bind(sendGaEventForHeaderClick, ctx))
  inject('sendGaEventForFooterClick', bind(sendGaEventForFooterClick, ctx))
  inject('sendGaEventForUsersVisit', bind(sendGaEventForUsersVisit, ctx))
  inject('listenScrollDepthForGaEvent', listenScrollDepthForGaEvent)
}
