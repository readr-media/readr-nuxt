function getHref({ type, id, slug } = {}) {
  switch (type) {
    case 1:
      return `/post/${id}`
    case 4:
      return `/project/${slug}`
    default:
      return undefined
  }
}

Object.assign(module.exports, {
  getHref,
})
