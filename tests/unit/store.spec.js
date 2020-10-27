// Api utilities
import moxios from 'moxios'
import api from '@/api'

// Utilities
import shows from '@/store/modules/showsInfo'
jest.mock('@/store')

describe('Store management', () => {
  beforeEach(() => {})

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  describe('Actions Testing', () => {
    beforeEach(() => {
      moxios.install(api)
    })

    afterEach(() => {
      moxios.uninstall(api)
    })

    it('when getAllShowIsnformation is call should commit SET_TV_SHOWS and SET_SHOWS_GENRES mutations', async () => {
      const commit = jest.fn()
      const showsData = [{
        id: 2,
        name: 'The Big Bang Theory',
        genres: ['Drama', 'Science-Fiction', 'Thriller'],
        rating: {
          average: 9.5
        }
      },
      {
        id: 3,
        name: 'GOT',
        genres: ['Drama', 'Thriller'],
        rating: {
          average: 8.5
        }
      }
      ]
      shows.actions.getAllShowIsnformation({
        commit
      }).then(() => {
        expect(commit).toHaveBeenCalledWith('SET_TV_SHOWS', showsData)
        expect(commit).toHaveBeenCalledWith('SET_SHOWS_GENRES', true)
      })
    })

    it('when getTvShowDetails is call should commit SET_TV_SHOW_INFO mutation', async () => {
      const commit = jest.fn()

      shows.actions.getTvShowDetails({
        commit
      }, 1).then(() => {
        expect(commit).toHaveBeenCalledWith('SET_TV_SHOW_INFO', true)
      })
    })

    it('when getTvShowDetailImages is call should commit SET_TV_SHOW_IMAGES mutation', done => {
      const commit = jest.fn()

      shows.actions
        .getTvShowDetailImages({
          commit
        }, 1)
        .then(() => {
          expect(commit).toHaveBeenCalledWith('SET_TV_SHOW_IMAGES', true)
        })
        .finally(done())
    })
  })
  describe('Mutations Testing', () => {
    const mockshow = [{
      id: 2,
      name: 'The Big Bang Theory',
      genres: ['Drama', 'Science-Fiction', 'Thriller'],
      rating: {
        average: 6.5
      }
    }]
    const state = {
      tvshows: [],
      genres: [],
      tvShowImages: [],
      completeShowInformation: []
    }
    it('should change the shows state', () => {
      shows.mutations.SET_TV_SHOWS(state, mockshow)
      expect(state.tvshows[0].name).toEqual('The Big Bang Theory')
    })
    it('should get Genre List', () => {
      shows.mutations.SET_SHOWS_GENRES(state, mockshow)
      expect(state.genres[0]).toEqual('Drama')
    })
    it('should change the show images state to an empty array', () => {
      shows.mutations.SET_TV_SHOW_IMAGES(state, [])
      expect(state.tvShowImages).toEqual([])
    })
    it('should get Show Info', () => {
      shows.mutations.SET_TV_SHOW_INFO(state, mockshow)
      expect(state.completeShowInformation).toEqual(mockshow)
    })
  })
})
