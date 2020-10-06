function imgAlt({ heroCaption, heroImage, ogImage }) {
  return heroCaption ?? heroImage?.title ?? ogImage?.title
}

Object.assign(module.exports, {
  imgAlt,
})
