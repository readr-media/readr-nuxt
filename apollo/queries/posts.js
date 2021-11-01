import gql from 'graphql-tag'

const latestPosts = gql`
  query($first: Int! = 3) {
    latestPosts: allPosts(
      first: $first
      where: { state: published, style_in: [news, report, embedded, project3] }
      sortBy: [publishTime_DESC]
    ) {
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
      wordCount
      publishTime
    }
  }
`

const latestPostsInErrorPage = gql`
  query {
    latestPosts: allPosts(
      first: 4
      where: { state: published, style_in: [news, report, embedded, project3] }
      sortBy: [publishTime_DESC]
    ) {
      id
      slug
      title: name
      style
      heroImage {
        urlMobileSized
      }
      ogImage {
        urlMobileSized
      }
    }
  }
`

const latestList = gql`
  query($skip: Int, $shouldQueryMeta: Boolean! = true) {
    items: allPosts(
      first: 25
      skip: $skip
      where: { state: published, style_in: [news, report, embedded, project3] }
      sortBy: [publishTime_DESC]
    ) {
      id
      slug
      title: name
      style
      heroImage {
        urlTabletSized
      }
      ogImage {
        urlTabletSized
      }
      publishTime
    }

    meta: _allPostsMeta @include(if: $shouldQueryMeta) {
      count
    }
  }
`

export { latestPosts, latestPostsInErrorPage, latestList }
