import gql from 'graphql-tag'

const categories = gql`
  query(
    $first: Int = 16
    $relatedPostFirst: Int = 4
    $relatedReportFirst: Int = 1
    $shouldQueryRelatedPost: Boolean = false
    $shouldQueryRelatedReport: Boolean = false
    $relatedPostTypes: [PostStyleType] = [news]
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
        where: { state: published, style_in: $relatedPostTypes }
        sortBy: [publishTime_DESC]
      ) @include(if: $shouldQueryRelatedPost) {
        id
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
        wordCount
      }
      reports: relatedPost(
        first: $relatedReportFirst
        where: { state: published, style_in: $relatedReportTypes }
        sortBy: [publishTime_DESC]
      ) @include(if: $shouldQueryRelatedReport) {
        id
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
        wordCount
      }
    }
  }
`

export { categories }
