import gql from 'graphql-tag'

const databaseList = gql`
  query($skip: Int, $first: Int = 3, $shouldQueryMeta: Boolean! = true) {
    items: allDatas(
      sortBy: [publishTime_DESC]
      first: $first
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

    meta: _allDatasMeta(where: { state: published })
      @include(if: $shouldQueryMeta) {
      count
    }
  }
`

export { databaseList }
