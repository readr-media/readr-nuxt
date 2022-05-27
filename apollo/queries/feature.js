import gql from 'graphql-tag'

const feature = gql`
  query {
    feature: allFeatures(where: { state: published }) {
      description
      featuredPost {
        id
        slug
        title: name
        subtitle
        style
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

export { feature }
