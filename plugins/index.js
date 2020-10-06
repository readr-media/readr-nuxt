const { href } = require('./link.js')
const { imgAlt } = require('./img.js')
const { getFormattedDate } = require('./date.js')

module.exports = injectAllMethods

function injectAllMethods(ctx, inject) {
  inject('href', href)
  inject('imgAlt', imgAlt)
  inject('getFormattedDate', getFormattedDate.bind(ctx))
}
