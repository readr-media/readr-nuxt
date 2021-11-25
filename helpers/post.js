import dayjs from 'dayjs'

const SITE_URL = 'https://www.readr.tw'

function getHref({ style, id, slug } = {}) {
  switch (style) {
    case 'news':
      return `/post/${id}`
    case 'embedded':
      return `/post/${id}`
    case 'report':
      return `${SITE_URL}/project/${slug}`
    case 'project3':
      return `${SITE_URL}/project/3/${slug}`
    default:
      return undefined
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

function formatReadTime(readingTime = 0) {
  return readingTime ? `閱讀時間 ${readingTime} 分鐘` : `閱讀時間 10 分鐘`
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

function doesHaveApiDataContent(data = []) {
  const validateArray = data?.map((dataContent) => {
    return (
      dataContent?.content?.length > 1 || dataContent?.content[0]?.length > 0
    )
  })
  return validateArray.find((item) => {
    return item
  })
}

export {
  getHref,
  formatDate,
  formatReadTime,
  formatPostDate,
  isReport,
  handleApiData,
  doesHaveApiDataContent,
}
