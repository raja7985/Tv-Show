// Components
import ShowsGenreList from '@/components/ShowsGenreList.vue'

// Utilities
import { mainInit } from './main-init'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = mainInit(createLocalVue())

describe('ShowsGenreList.vue', () => {
  let wrapper

  const mountFunction = options => {
    return shallowMount(ShowsGenreList, {
      localVue,
      propsData: {
        item: {
          id: 1,
          name: 'Test'
        }
      },
      ...options
    })
  }

  beforeEach(() => {
    wrapper = mountFunction()
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should be a Vue instance and be called ShowsGenreList', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.name()).toMatch('ShowsGenreList')
  })
  it('should get average of the number', () => {
    const rating = 10
    const avg = wrapper.vm.averageRating(rating)
    expect(avg).toBe(10)
  })
  it('should get zero rating when input is null', () => {
    const rating = null
    const avg = wrapper.vm.averageRating(rating)
    expect(avg).toBe(0)
  })
})
