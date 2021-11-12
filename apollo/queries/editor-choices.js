import gql from 'graphql-tag'

const editorChoices = gql`
  query {
    editorChoices: allEditorChoices(
      sortBy: [sortOrder_ASC, publishTime_DESC]
      first: 3
      where: { state: published }
    ) {
      choice {
        id
        title: name
        slug
        style
        wordCount
        heroImage {
          urlTabletSized
          urlMobileSized
        }
        publishTime
      }
      publishTime
    }
  }
`

export { editorChoices }
