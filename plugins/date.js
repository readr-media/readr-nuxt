export { getFormattedDate }

function getFormattedDate(datetime = '') {
  return this.$dayjs(datetime).format('MMM D, YYYY')
}
