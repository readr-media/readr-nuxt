import gql from 'graphql-tag'

const categories = gql`
  query($first: Int = 16, $shouldQueryRelatedPost: Boolean = false) {
    categories: allCategories(
      first: $first
      where: { state: active }
      sortBy: [createdAt_ASC]
    ) {
      slug
      name
      relatedPost(first: 5, where: { state: published })
        @include(if: $shouldQueryRelatedPost) {
        id
        style
        title: name
        heroImage {
          urlMobileSized
          urlTabletSized
        }
        ogImage {
          urlMobileSized
          urlTabletSized
        }
      }
    }
  }
`

export { categories }
