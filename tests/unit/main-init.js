// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

// Api
import moxios from 'moxios'
import api from '@/api'

// Global components
import Loader from '@/components/Loader.vue'

function mainInit (VueInstance) {
  Vue.use(Vuetify)
  moxios.install(api)
  VueInstance.use(VueRouter)
  VueInstance.use(Vuex)
  VueInstance.use(Vuetify)
  VueInstance.config.productionTip = false
  VueInstance.component('Loader', Loader)
  return VueInstance
}

export {
  mainInit
}
