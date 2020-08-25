import { bind as rBind } from 'ramda'

import { getHref } from './link.js'
import { getImage } from './image.js'
import { getFormattedDate } from './date.js'
import {
  sendGaEvtHomeClick,
  sendGaEvtHomeScroll,
  sendGaEvtArticleClick,
  sendGaEvtArticleScroll,
  listenGaEvtScrollDepth,
} from './ga.js'

export default injectAllMethods

function injectAllMethods(ctx, inject) {
  inject('getHref', getHref)
  inject('getImage', getImage)
  inject('getFormattedDate', getFormattedDate.bind(ctx))

  inject('sendGaEvtHomeClick', rBind(sendGaEvtHomeClick, ctx))
  inject('sendGaEvtHomeScroll', rBind(sendGaEvtHomeScroll, ctx))
  inject('sendGaEvtArticleClick', rBind(sendGaEvtArticleClick, ctx))
  inject('sendGaEvtArticleScroll', rBind(sendGaEvtArticleScroll, ctx))
  inject('listenGaEvtScrollDepth', rBind(listenGaEvtScrollDepth, ctx))
}
