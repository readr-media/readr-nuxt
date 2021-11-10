import gql from 'graphql-tag'

const feature = gql`
  query {
    feature: allFeatures(
      sortBy: [sortOrder_ASC, publishTime_DESC]
      first: 4
      where: { state: published }
    ) {
      description
      featuredPost {
        id
        slug
        title: name
        style
        heroImage {
          urlMobileSized
          urlTabletSized
        }
        ogImage {
          urlTabletSized
        }
      }
    }
  }
`

export { feature }
