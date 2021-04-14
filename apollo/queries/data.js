import gql from 'graphql-tag'

const databaseList = gql`
  query($skip: Int, $shouldQueryMeta: Boolean! = true) {
    items: allDatas(
      sortBy: [publishTime_DESC]
      first: 3
      skip: $skip
      where: { state: published }
    ) {
      id
      title: name
      link
      relatedGallery(sortBy: [createdAt_DESC], first: 3) {
        id
        link
        writers {
          id
          name
        }
        heroImage {
          urlTinySized
        }
      }
    }

    meta: _allDatasMeta @include(if: $shouldQueryMeta) {
      count
    }
  }
`

export { databaseList }
