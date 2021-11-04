import gql from 'graphql-tag'

const categories = gql`
  query {
    categories: allCategories(
      where: { state: active }
      sortBy: [createdAt_ASC]
    ) {
      slug
      name
    }
  }
`

export { categories }
