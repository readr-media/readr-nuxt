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

function handleApiData(apiData = '') {
  try {
    const rawString = apiData ?? ''
    const content = JSON.parse(rawString)

    return content?.filter((item) => item) || []
  } catch {
    return []
  }
}

function formatReadTime(wordCount = 0, imageCount = 0) {
  const min = Math.round((wordCount / 8 + imageCount * 10) / 60)
  return min ? `閱讀時間 ${min} 分鐘` : ''
}

function formatPostDate(datetime) {
  const nowYear = new Date().getFullYear()
  const formatStr =
    nowYear === new Date(datetime).getFullYear() ? 'MM/DD' : 'YYYY/MM/DD'
  return dayjs(datetime).format(formatStr)
}

function isReport(style = '') {
  return style === 'report' || style === 'project3' || style === 'embedded'
}

export {
  getHref,
  formatDate,
  formatReadTime,
  formatPostDate,
  isReport,
  handleApiData,
}
