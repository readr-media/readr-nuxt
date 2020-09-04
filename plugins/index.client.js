const bind = require('ramda/src/bind')

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
  inject('sendGaEvtForHomeClick', bind(sendGaEvtForHomeClick, ctx))
  inject('sendGaEvtForHomeScroll', bind(sendGaEvtForHomeScroll, ctx))
  inject('sendGaEvtForArticleClick', bind(sendGaEvtForArticleClick, ctx))
  inject('sendGaEvtForArticleScroll', bind(sendGaEvtForArticleScroll, ctx))
  inject('sendGaEvtForLandingClick', bind(sendGaEvtForLandingClick, ctx))
  inject('sendGaEvtForHeaderClick', bind(sendGaEvtForHeaderClick, ctx))
  inject('sendGaEvtForFooterClick', bind(sendGaEvtForFooterClick, ctx))
  inject('sendGaEvtForUsersVisit', bind(sendGaEvtForUsersVisit, ctx))
  inject('listenScrollDepthForGaEvt', bind(listenScrollDepthForGaEvt, ctx))
}
