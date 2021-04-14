import gql from 'graphql-tag'

const collaborations = gql`
  query {
    collaborations: allCollaborations(
      sortBy: [publishTime_DESC]
      first: 10
      where: { state: published }
    ) {
      id
      title: name
      description
      heroImage {
        urlMobileSized
      }
      progress
      collabLink
      achvLink
      requireTime
      endTime
    }
  }
`

export { collaborations }
