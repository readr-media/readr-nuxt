export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    const headerResponse = await dispatch('fetchHeaderData')
    const categoriesResponse = await dispatch('fetchCategories')
    commitHeaderData(commit, headerResponse)
    commitCategoryData(commit, categoriesResponse)
  },
  async fetchHeaderData({ dispatch }) {
    const response = await dispatch('category/fetchHeaderDataList')
    return response
  },
  async fetchCategories({ dispatch }) {
    const response = await dispatch('category/fetchCategoryList')
    return response
  },
}

function commitHeaderData(commit, response) {
  commit('category/setHeaderData', response)
}
function commitCategoryData(commit, response) {
  commit('category/setCategoryList', response)
}
