import gql from 'graphql-tag'

const editorChoices = gql`
  query {
    editorChoices: allEditorChoices(
      sortBy: [sortOrder_ASC, publishTime_DESC]
      first: 5
      where: { state: published }
    ) {
      id
      title: name
      link
      heroImage {
        urlTabletSized
      }
    }
  }
`

export { editorChoices }
