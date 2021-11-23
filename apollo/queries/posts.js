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
      readingTime
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
  query($skip: Int, $first: Int! = 16, $shouldQueryMeta: Boolean! = true) {
    items: allPosts(
      first: $first
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
      readingTime
    }

    meta: _allPostsMeta @include(if: $shouldQueryMeta) {
      count
    }
  }
`

const latestListByCategorySlug = gql`
  query(
    $skip: Int
    $first: Int! = 16
    $shouldQueryMeta: Boolean! = true
    $categorySlug: String = ""
  ) {
    items: allPosts(
      first: $first
      skip: $skip
      where: {
        state: published
        style_in: [news, report, embedded, project3]
        categories_some: { slug: $categorySlug }
      }
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
      readingTime
    }

    meta: _allPostsMeta @include(if: $shouldQueryMeta) {
      count
    }
  }
`

const latestListByTagName = gql`
  query(
    $skip: Int
    $first: Int! = 16
    $shouldQueryMeta: Boolean! = true
    $tagName: String = ""
  ) {
    items: allPosts(
      first: $first
      skip: $skip
      where: {
        state: published
        style_in: [news, report, embedded, project3]
        tags_some: { name: $tagName }
      }
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
      readingTime
    }

    meta: _allPostsMeta(
      where: {
        state: published
        style_in: [news, report, embedded, project3]
        tags_some: { name: $tagName }
      }
    ) @include(if: $shouldQueryMeta) {
      count
    }
  }
`

export {
  latestPosts,
  latestPostsInErrorPage,
  latestList,
  latestListByCategorySlug,
  latestListByTagName,
}
