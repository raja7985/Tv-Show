import {
  getListOfTvShows,
  getShow,
  getTvShowImages
} from '@/api/tv_shows_info_api'

const state = {
  tvshows: [],
  genres: [],
  completeShowInformation: [],
  tvShowImages: []
}

const getters = {
  getTvShows (state) {
    return state.tvshows
  },
  getTvShowGenre (state) {
    return state.genres
  },
  getTvShowDetail (state) {
    return state.completeShowInformation
  },
  getTvShowImages (state) {
    return state.tvShowImages
  }
}

const actions = {
  async getAllShowIsnformation ({
    commit
  }) {
    return getListOfTvShows().then(response => {
      commit(
        'SET_TV_SHOWS', response.data)
      commit(
        'SET_SHOWS_GENRES', response.data)
    })
  },
  async getTvShowDetails ({
    commit
  }, id) {
    return getShow(id).then((response) => {
      if (response && response.data) { commit('SET_TV_SHOW_INFO', response.data) }
    })
  },
  async getTvShowDetailImages ({
    commit
  }, id) {
    return getTvShowImages(id).then((response) => {
      if (response && response.data) { commit('SET_TV_SHOW_IMAGES', response.data) }
    })
  }
}

const mutations = {
  SET_TV_SHOWS (state, data) {
    state.tvshows = data.sort((prevValue, nextValue) => prevValue.rating.average < nextValue.rating.average ? 1 : -1)
  },
  SET_SHOWS_GENRES (state, data) {
    state.genres = data
      .reduce((acc, show) => acc.concat(show.genres), [])
      .filter((genre, index, self) => self.indexOf(genre) === index)
  },
  SET_TV_SHOW_INFO (state, data) {
    state.completeShowInformation = data
  },
  SET_TV_SHOW_IMAGES (state, data) {
    state.tvShowImages = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
