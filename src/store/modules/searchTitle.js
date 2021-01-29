export default {
  namespaced: true,
  state: {
    searchTitles: []
  },
  mutations: {
    setSearchTitles (state, data) {
      state.searchTitles.push(data)
    }
  }
}
