// Components
import NotFound from '@/views/NotFound.vue'

// Utilities
import { mainInit } from './main-init'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = mainInit(createLocalVue())

describe('NotFound.vue', () => {
  const mountFunction = options => {
    return shallowMount(NotFound, {
      localVue,
      ...options
    })
  }

  it('should have a component name', () => {
    const wrapper = mountFunction()

    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.name()).toMatch('NotFound')
  })
})
