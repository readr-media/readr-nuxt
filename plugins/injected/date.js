function getFormattedDate(datetime = '') {
  return this.$dayjs(datetime).format('MMM D, YYYY')
}

Object.assign(module.exports, {
  getFormattedDate,
})
