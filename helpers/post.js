import {
  READR_MEDIA_OLD_PROJECT_SLUGS,
  MIRROR_MEDIA_OLD_PROJECT_SLUGS,
} from '@readr-media/old-news-project-slugs'
import dayjs from 'dayjs'

function getHref({ type, id, slug } = {}) {
  switch (type) {
    case 1:
      return `/post/${id}`
    case 4:
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

function getImg({ heroImage, ogImage, image } = {}) {
  return heroImage || ogImage || image || require('~/assets/default/post.svg')
}

export { getHref, getImg, formatDate }
