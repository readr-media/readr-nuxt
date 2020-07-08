import { getFormattedDate } from './date.js'

export default injectAllMethods

function injectAllMethods(ctx, inject) {
  inject('getFormattedDate', getFormattedDate.bind(ctx))
}
