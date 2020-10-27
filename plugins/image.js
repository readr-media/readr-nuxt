const defaultImgPost = require('../assets/default/post.svg')

function getImage({ heroImage, ogImage, image } = {}, needDefaultImage = true) {
  return (
    heroImage ||
    ogImage ||
    image ||
    (needDefaultImage ? defaultImgPost : undefined)
  )
}

Object.assign(module.exports, {
  getImage,
})
