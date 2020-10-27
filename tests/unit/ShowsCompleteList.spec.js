// Components
import ShowsCompleteList from '@/views/ShowsCompleteList.vue'
import Vuetify from 'vuetify'

// Utilities
import {
  mainInit
} from './main-init'
import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'
import {
  __createMocks as createStoreMocks
} from '@/store'

jest.mock('@/store')

const vuetify = new Vuetify()
const localVue = mainInit(createLocalVue())

describe('ShowsCompleteList.vue', () => {
  let storeMocks
  let wrapper

  const mountFunction = options => {
    return shallowMount(ShowsCompleteList, {
      localVue,
      store: storeMocks.store,
      vuetify,
      ...options
    })
  }

  beforeEach(() => {
    storeMocks = createStoreMocks()
    wrapper = mountFunction()
  })

  afterEach(() => {
    wrapper.destroy()
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('should be a Vue instance and be called ShowsCompleteList', async () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.name()).toMatch('ShowsCompleteList')
  })

  it('should get 1 result from Drama genre', () => {
    const results = wrapper.vm.showsByGenre('Drama')

    expect(results[0].id).toEqual(1)
  })

  it('should call getAllShowIsnformation when getTvShows is void', () => {
    storeMocks = createStoreMocks({
      showsGetters: {
        getTvShows: () => []
      }
    })
    wrapper = mountFunction({
      store: storeMocks.store
    })
    expect(storeMocks.showsActions.getAllShowIsnformation).toHaveBeenCalled()
  })
})
