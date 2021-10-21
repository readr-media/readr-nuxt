import gql from 'graphql-tag'

const report = gql`
  query($id: ID!) {
    post: Post(where: { id: $id }) {
      slug
      title: name
      heroImage {
        urlDesktopSized
      }
      contentApiData
      ogTitle
      ogDescription
      ogImage {
        urlDesktopSized
      }
      tags {
        name
      }
      publishTime
      updatedAt
    }
  }
`

const news = gql`
  query($id: ID!) {
    post: Post(where: { id: $id }) {
      title: name
      heroImage {
        name
        urlMobileSized
        urlDesktopSized
      }
      contentHtml
      ogTitle
      ogDescription
      ogImage {
        name
        urlMobileSized
        urlDesktopSized
      }
      tags {
        name
      }
      publishTime
      updatedAt
    }
  }
`

const post = gql`
  query($id: ID!) {
    post: Post(where: { id: $id }) {
      slug
      title: name
      heroImage {
        name
        urlMobileSized
        urlDesktopSized
      }
      categories {
        name
      }
      writers {
        name
      }
      photographers {
        name
      }
      cameraOperators {
        name
      }
      designers {
        name
      }
      engineers {
        name
      }
      dataAnalysts {
        name
      }
      otherByline
      heroCaption
      contentHtml
      contentApiData
      summaryApiData
      ogTitle
      ogDescription
      ogImage {
        name
        urlMobileSized
        urlDesktopSized
      }
      tags {
        name
      }
      style
      wordCount
      publishTime
      updatedAt
    }
  }
`

export { report, news, post }
