const defaultImgPost = require('../assets/default/post.svg')

function getImage({ heroImage, ogImage, image } = {}, needDefaultImage = true) {
  return (
    heroImage ||
    ogImage ||
    image ||
    (needDefaultImage ? defaultImgPost : undefined)
  )
}

function imgAlt({ heroImage, ogImage, heroCaption }) {
  return heroCaption ?? heroImage?.title ?? ogImage?.title
}

Object.assign(module.exports, {
  getImage,
  imgAlt,
})
