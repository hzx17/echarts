import Vue from 'vue'
import VueRouter from 'vue-router'
import Sellerpage from '@/views/SellerPage.vue'
import Trendpage from '@/views/TrendPage.vue'
import MapPage from '@/views/MapPage.vue'
import RankPage from '@/views/RankPage'
import HotPage from '@/views/HotPage'
import StockPage from '@/views/StockPage'
import ScreenPage from '@/views/ScreenPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ScreenPage
  },
  {
    path: '/screen',
    component: ScreenPage
  },
  {
    path: '/sellerpage',
    component: Sellerpage
  },
  {
    path: '/trendpage',
    component: Trendpage
  },
  {
    path: '/mappage',
    component: MapPage
  },
  {
    path: '/rankpage',
    component: RankPage
  },
  {
    path: '/hotpage',
    component: HotPage
  },
  {
    path: '/stockpage',
    component: StockPage
  }
]

const router = new VueRouter({
  routes
})

export default router
