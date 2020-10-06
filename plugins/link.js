const oldNewsProjectSlugs = require('@readr-media/old-news-project-slugs')

function href({ style, id, slug }) {
  switch (style) {
    case 'news':
      return `/post/${id}`
    case 'report':
      return oldNewsProjectSlugs.includes(slug)
        ? `/project/${slug}`
        : `/project/3/${slug}`
    default:
      return undefined
  }
}

Object.assign(module.exports, {
  href,
})
