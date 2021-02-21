const { getHref } = require('./link.js')
const { getImage } = require('./image.js')
const { getFormattedDate } = require('./date.js')

module.exports = injectAllMethods

function injectAllMethods(ctx, inject) {
  inject('getHref', getHref)
  inject('getImage', getImage)
  inject('getFormattedDate', getFormattedDate.bind(ctx))
}
