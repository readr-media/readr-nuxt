import { bind as rBind } from 'ramda'

import { getHref } from './link.js'
import { getImage } from './image.js'
import { getFormattedDate } from './date.js'
import {
  sendGaEvtForHomeClick,
  sendGaEvtForHomeScroll,
  sendGaEvtForArticleClick,
  sendGaEvtForArticleScroll,
  listenScrollDepthForGaEvt,
} from './ga.js'

export default injectAllMethods

function injectAllMethods(ctx, inject) {
  inject('getHref', getHref)
  inject('getImage', getImage)
  inject('getFormattedDate', getFormattedDate.bind(ctx))

  inject('sendGaEvtForHomeClick', rBind(sendGaEvtForHomeClick, ctx))
  inject('sendGaEvtForHomeScroll', rBind(sendGaEvtForHomeScroll, ctx))
  inject('sendGaEvtForArticleClick', rBind(sendGaEvtForArticleClick, ctx))
  inject('sendGaEvtForArticleScroll', rBind(sendGaEvtForArticleScroll, ctx))
  inject('listenScrollDepthForGaEvt', rBind(listenScrollDepthForGaEvt, ctx))
}
