import gql from 'graphql-tag'

const categories = gql`
  query(
    $first: Int
    $relatedPostFirst: Int = 4
    $relatedReportFirst: Int = 1
    $postSkip: Int
    $reportSkip: Int
    $shouldQueryRelatedPost: Boolean = false
    $shouldQueryRelatedReport: Boolean = false
    $relatedPostTypes: [PostStyleType] = [news, frame, blank]
    $relatedReportTypes: [PostStyleType] = [embedded, project3, report]
  ) {
    categories: allCategories(
      first: $first
      where: { state: active }
      sortBy: [createdAt_ASC]
    ) {
      slug
      name
      posts: relatedPost(
        first: $relatedPostFirst
        skip: $postSkip
        where: { state: published, style_in: $relatedPostTypes }
        sortBy: [publishTime_DESC]
      ) @include(if: $shouldQueryRelatedPost) {
        id
        slug
        style
        title: name
        heroImage {
          urlMobileSized
          urlTabletSized
        }
        ogImage {
          urlMobileSized
          urlTabletSized
        }
        publishTime
        readingTime
      }
      reports: relatedPost(
        first: $relatedReportFirst
        skip: $reportSkip
        where: { state: published, style_in: $relatedReportTypes }
        sortBy: [publishTime_DESC]
      ) @include(if: $shouldQueryRelatedReport) {
        id
        slug
        style
        title: name
        heroImage {
          urlMobileSized
          urlTabletSized
        }
        ogImage {
          urlMobileSized
          urlTabletSized
        }
        publishTime
        readingTime
      }
    }
  }
`

export { categories }
