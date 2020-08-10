import defaultImgPost from '~/assets/default/post.svg'

export { getImage }

function getImage({ heroImage, ogImage, image } = {}, needDefaultImage = true) {
  return (
    heroImage ||
    ogImage ||
    image ||
    (needDefaultImage ? defaultImgPost : undefined)
  )
}
