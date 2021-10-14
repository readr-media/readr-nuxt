import dayjs from 'dayjs'

function getHref({ style, id, slug } = {}) {
  switch (style) {
    case 'news':
      return `/post/${id}`
    case 'embedded':
      return `/post/${id}`
    case 'report':
      return `/project/${slug}`
    case 'project3':
      return `/project/3/${slug}`
    default:
      return `/post/${id}`
  }
}

function formatDate(datetime = '') {
  return dayjs(datetime).format('MMM D, YYYY')
}

export { getHref, formatDate }
