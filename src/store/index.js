import Vue from 'vue'
import Vuex from 'vuex'

// All Modules
import Shows from './modules/showsInfo'
import Search from './modules/searchResults'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Shows: Shows,
    Search: Search
  }
})

export default store
