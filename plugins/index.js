import { getImage } from './image.js'
import { getFormattedDate } from './date.js'

export default injectAllMethods

function injectAllMethods(ctx, inject) {
  inject('getImage', getImage)
  inject('getFormattedDate', getFormattedDate.bind(ctx))
}
