const { getHref, getHrefKs } = require('./link.js')
const { getImage, imgAlt } = require('./img.js')
const { getFormattedDate } = require('./date.js')

module.exports = injectAllMethods

function injectAllMethods(ctx, inject) {
  inject('getHref', getHref)
  inject('getHrefKs', getHrefKs)
  inject('getImage', getImage)
  inject('imgAlt', imgAlt)
  inject('getFormattedDate', getFormattedDate.bind(ctx))
}
