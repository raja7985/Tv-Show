import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
  path: '/',
  name: 'shows',
  component: () => import('../views/ShowsCompleteList.vue')
},
{
  path: '/show/:id',
  name: 'show',
  component: () => import('../views/ShowDetail.vue'),
  props: true
},
{
  path: '/404',
  alias: '*',
  name: 'notFound',
  component: () => import('../views/NotFound.vue')
}
]
// Router
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
