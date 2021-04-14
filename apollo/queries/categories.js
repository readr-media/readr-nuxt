import gql from 'graphql-tag'

const categories = gql`
  query {
    categories: allCategories(
      first: 6
      where: { state: active }
      sortBy: [createdAt_ASC]
    ) {
      slug
      name
    }
  }
`

export { categories }
