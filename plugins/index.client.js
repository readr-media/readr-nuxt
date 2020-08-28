const { bind: rBind } = require('ramda')

const {
  sendGaEvtForHomeClick,
  sendGaEvtForHomeScroll,
  sendGaEvtForArticleClick,
  sendGaEvtForArticleScroll,
  sendGaEvtForLandingClick,
  sendGaEvtForHeaderClick,
  sendGaEvtForFooterClick,
  sendGaEvtForUsersVisit,
  listenScrollDepthForGaEvt,
} = require('./ga.client.js')

module.exports = injectAllMethods

function injectAllMethods(ctx, inject) {
  inject('sendGaEvtForHomeClick', rBind(sendGaEvtForHomeClick, ctx))
  inject('sendGaEvtForHomeScroll', rBind(sendGaEvtForHomeScroll, ctx))
  inject('sendGaEvtForArticleClick', rBind(sendGaEvtForArticleClick, ctx))
  inject('sendGaEvtForArticleScroll', rBind(sendGaEvtForArticleScroll, ctx))
  inject('sendGaEvtForLandingClick', rBind(sendGaEvtForLandingClick, ctx))
  inject('sendGaEvtForHeaderClick', rBind(sendGaEvtForHeaderClick, ctx))
  inject('sendGaEvtForFooterClick', rBind(sendGaEvtForFooterClick, ctx))
  inject('sendGaEvtForUsersVisit', rBind(sendGaEvtForUsersVisit, ctx))
  inject('listenScrollDepthForGaEvt', rBind(listenScrollDepthForGaEvt, ctx))
}
