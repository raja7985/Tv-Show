import store from '@/store'
import SearchBar from '@/components/SearchBar.vue'
import { mainInit } from './main-init'
import { createLocalVue, shallowMount } from '@vue/test-utils'
const localVue = mainInit(createLocalVue())
describe('SearchBar.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mountFunction()
  })
  afterEach(() => {
    wrapper.destroy()
    jest.resetModules()
    jest.clearAllMocks()
  })
  const mountFunction = options => {
    return shallowMount(SearchBar, {
      localVue,
      store,
      ...options,
      data: () => ({
        searchKeyword: '',
        timer: null,
        isDataLoading: false
      })
    })
  }
  it('should be a Vue Instance called SearchBar', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.name()).toMatch('SearchBar')
  })

  it('should have a searchKeyword value of test', done => {
    wrapper.vm.searchKeyword = 'test'
    wrapper.vm.getSearchResults()
    expect(wrapper.vm.searchKeyword).toMatch('test')
    done()
  })
  it('search for overlay', () => {
    expect(wrapper.contains('v-overlay-stub')).toBe(true)
  })
  it('contains cross icon for overlay', () => {
    expect(wrapper.contains('v-icon-stub')).toBe(true)
  })
  it('it should have a input field', () => {
    expect(wrapper.find('#search-field')).toBeTruthy()
  })
  it('timeout function to be be called in searchShows', async () => {
    wrapper.vm.searchKeyword = 'star'
    wrapper.vm.isDataLoading = true
    jest.useFakeTimers()
    wrapper.vm.searchShows()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000)
  })
  it('handleSearch function', () => {
    wrapper.vm.searchKeyword = 'star'
    wrapper.vm.handleSearch()
    expect(wrapper.vm.searchKeyword).toBe('')
  })
  it('getSearchResults function not to be called', () => {
    const getSearchResults = jest.fn()
    wrapper.vm.searchKeyword = 'st'
    wrapper.vm.searchShows()
    jest.useFakeTimers()
    setTimeout(() => {
      expect(getSearchResults).toHaveBeenCalledTimes(0)
      expect(wrapper.vm.isDataLoading).toBe(false)
      expect(wrapper.vm.searchEnd).toBe(false)
    }, 2000)
    jest.runAllTimers()
  })
  it('loader to be called on Search', () => {
    wrapper.vm.searchKeyword = 'star'
    wrapper.vm.searchShows()
    jest.useFakeTimers()
    setTimeout(() => {
      expect(wrapper.vm.isDataLoading).toBe(true)
    }, 2000)
    jest.runAllTimers()
  })
})
