// Components
import ShowDetail from '@/views/ShowDetail.vue'

// Custom router
import router from '@/router'

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

const localVue = mainInit(createLocalVue())

describe('ShowDetail.vue', () => {
  let storeMocks
  let wrapper

  const mountFunction = options => {
    storeMocks = createStoreMocks()

    return shallowMount(ShowDetail, {
      localVue,
      propsData: {
        id: 1
      },
      router,
      store: storeMocks.store,
      ...options
    })
  }

  beforeEach(() => {
    wrapper = mountFunction()
  })

  afterEach(() => {
    wrapper.destroy()
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('should be a Vue instance and be called ShowDetail', async () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.name()).toMatch('ShowDetail')
  })

  describe('Computed properties', () => {
    it('should return a background and a poster image', () => {
      expect(wrapper.vm.showsBackgroundImage).toBe('bgImage.jpg')
      expect(wrapper.vm.detailsPageShowImage).toBe('tvShowImage.jpg')
    })
    it('should return empty background image', () => {
      storeMocks = createStoreMocks({
        showsGetters: {
          getTvShowImages: () => [{
            type: 'poster',
            resolutions: {
              original: {
                url: 'tvShowImage.jpg'
              }
            }
          }]
        }
      })
      wrapper = mountFunction({
        store: storeMocks.store
      })
      expect(wrapper.vm.showsBackgroundImage).toBe('')
    })
  })

  it('should call the before route update hook', async () => {
    const next = jest.fn()
    ShowDetail.beforeRouteUpdate.call(
      wrapper.vm, {
        params: {
          id: 1
        }
      }, {},
      next
    )
    await wrapper.vm.$nextTick()

    expect(storeMocks.showsActions.getTvShowDetails).toHaveBeenCalled()
    expect(storeMocks.showsActions.getTvShowDetailImages).toHaveBeenCalled()
  })
  it('should convert html to text ', () => {
    const text = '<b>text</b>'
    const formatted = wrapper.vm.convertHtmlToText(text)
    expect(formatted).toBe('text')
  })
  it('when there is no text ', () => {
    const text = ''
    const formatted = wrapper.vm.convertHtmlToText(text)
    expect(formatted).toBe('')
  })
  it('should get average of the number', () => {
    const rating = 10
    wrapper.vm.averageRating(rating)
    expect(wrapper.vm.average).toBe(10)
  })
  it('should get zero rating', () => {
    const rating = 0
    wrapper.vm.averageRating(rating)
    expect(wrapper.vm.average).toBe(0)
  })
  it('should get zero rating when input is null', () => {
    const rating = null
    wrapper.vm.averageRating(rating)
    expect(wrapper.vm.average).toBe(0)
  })
  it('onPageLoad function invoked', () => {
    wrapper.vm.isDataLoading = false
    wrapper.vm.onPageLoad()
    expect(wrapper.vm.isDataLoading).toBe(true)
  })
})
