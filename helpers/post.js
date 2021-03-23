import {
  READR_MEDIA_OLD_PROJECT_SLUGS,
  MIRROR_MEDIA_OLD_PROJECT_SLUGS,
} from '@readr-media/old-news-project-slugs'
import dayjs from 'dayjs'

function getHrefFromKeystone({ style, id, slug } = {}) {
  switch (style) {
    case 'news':
      return `/post/${id}`
    case 'report':
      if (READR_MEDIA_OLD_PROJECT_SLUGS.includes(slug)) {
        return `/project/${slug}`
      } else if (MIRROR_MEDIA_OLD_PROJECT_SLUGS.includes(slug)) {
        return `https://www.mirrormedia.mg/projects/${slug}/index.html`
      } else {
        return `/project/3/${slug}`
      }
    default:
      return undefined
  }
}

function formatDate(datetime = '') {
  return dayjs(datetime).format('MMM D, YYYY')
}

export { getHrefFromKeystone, formatDate }
