const state = {
  openSearch: false
}

const getters = {
  getOverlayOnSearch (state) {
    return state.openSearch
  }
}

const mutations = {
  SET_OVERLAY_ON_SEARCH (state, data) {
    state.openSearch = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
