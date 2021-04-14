import gql from 'graphql-tag'

const quotes = gql`
  query {
    quotes: allQuotes(
      first: 10
      where: { state: published }
      sortBy: [publishTime_DESC]
    ) {
      id
      title: name
      byline
    }
  }
`

export { quotes }
