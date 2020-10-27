/* eslint-disable no-undef */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const showsGetters = {
  getTvShows: jest.fn().mockReturnValue([{
    id: 1,
    name: 'GOT',
    genres: ['Drama']
  }]),
  getTvShowGenre: jest.fn().mockReturnValue(['Drama']),
  getTvShowDetail: jest.fn().mockReturnValue({
    id: 1,
    name: 'GOT'
  }),
  getTvShowImages: jest.fn().mockReturnValue([{
    type: 'background',
    resolutions: {
      original: {
        url: 'bgImage.jpg'
      }
    }
  },
  {
    type: 'poster',
    resolutions: {
      original: {
        url: 'tvShowImage.jpg'
      }
    }
  }
  ])
}

export const showsActions = {
  getAllShowIsnformation: jest.fn(),
  getTvShowDetails: jest.fn(),
  getTvShowDetailImages: jest.fn()
}

export const showsMutations = {
  SET_TV_SHOWS: jest.fn(),
  SET_SHOWS_GENRES: jest.fn(),
  SET_TV_SHOW_INFO: jest.fn(),
  SET_TV_SHOW_IMAGES: jest.fn()
}

export const showsState = {
  shows: [{
    id: 1,
    name: 'Thor'
  }],
  genres: ['Drama'],
  completeShowInformation: {
    id: 1,
    name: 'Thor'
  },
  tvShowImages: [{
    id: 1,
    type: 'background',
    resolutions: {
      original: {
        url: 'bgImage.jpg'
      }
    }
  }]
}

// eslint-disable-next-line no-underscore-dangle
export function __createMocks (
  custom = {
    showsActions: {},
    showsMutations: {},
    showsState: {},
    showsGetters: {}
  }
) {
  const mockShowsActions = Object.assign({}, showsActions, custom.showsActions)
  const mockShowsState = Object.assign({}, showsState, custom.showsState)
  const mockShowsGetters = Object.assign({}, showsGetters, custom.showsGetters)
  const mockShowsMutations = Object.assign({},
    showsMutations,
    custom.showsMutations
  )

  return {
    showsState: mockShowsState,
    showsGetters: mockShowsGetters,
    showsActions: mockShowsActions,
    showsMutations: mockShowsMutations,
    store: new Vuex.Store({
      modules: {
        Shows: {
          namespaced: true,
          state: mockShowsState,
          getters: mockShowsGetters,
          actions: mockShowsActions,
          mutations: mockShowsMutations
        },
        Search: {
          namespaced: true
        }
      }
    })
  }
}

export const store = __createMocks().store
