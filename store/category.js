import { categories } from '~/apollo/queries/categories.js'

function state() {
  return {
    headerData: [],
    categoryList: [],
  }
}

const getters = {
  headerData(state) {
    return state.headerData ?? []
  },
  categoryList(state) {
    const list = state.categoryList ?? []
    return sortByDate(list)
  },
}

const mutations = {
  setHeaderData(state, data) {
    state.headerData = data
  },
  setCategoryList(state, data) {
    state.categoryList = data
  },
}

const actions = {
  async fetchHeaderDataList() {
    const response = await this.app.apolloProvider.clients.defaultClient.query({
      query: categories,
      variables: {
        first: 6,
        shouldQueryRelatedPost: true,
        relatedPostFirst: 5,
        relatedPostTypes: [
          'news',
          'embedded',
          'project3',
          'report',
          'frame',
          'blank',
          'scrollablevideo',
        ],
      },
    })
    return response?.data?.categories ?? []
  },
  async fetchCategoryList() {
    const response = await this.app.apolloProvider.clients.defaultClient.query({
      query: categories,
      variables: {
        shouldQueryRelatedPost: true,
        relatedPostFirst: 1,
        relatedPostTypes: [
          'news',
          'embedded',
          'project3',
          'report',
          'frame',
          'blank',
          'scrollablevideo',
        ],
      },
    })
    return response?.data?.categories ?? []
  },
}

function sortByDate(arr) {
  const array = arr
    .map((item) => {
      return {
        slug: item?.slug ?? '',
        name: item?.name ?? '',
        time: item?.posts?.[0]?.publishTime ?? undefined,
      }
    })
    .filter((item) => item.time)

  return array.sort((a, b) => new Date(b.time) - new Date(a.time))
}

export { state, getters, mutations, actions }
