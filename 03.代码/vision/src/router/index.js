import Vue from 'vue'
import VueRouter from 'vue-router'
import Sellerpage from '@/views/SellerPage.vue'
import Trendpage from '@/views/TrendPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sellerpage',
    component: Sellerpage
  },
  {
    path: '/trendpage',
    component: Trendpage
  }
]

const router = new VueRouter({
  routes
})

export default router
