import defaultImage from '~/assets/og-img.jpg'

export { getImage }

function getImage({ heroImage, ogImage, image } = {}, needDefaultImage = true) {
  return (
    heroImage ||
    ogImage ||
    image ||
    (needDefaultImage ? defaultImage : undefined)
  )
}
