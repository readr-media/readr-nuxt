const {
  READR_MEDIA_OLD_PROJECT_SLUGS,
  MIRROR_MEDIA_OLD_PROJECT_SLUGS,
} = require('@readr-media/old-news-project-slugs')

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

Object.assign(module.exports, {
  getHref,
})
