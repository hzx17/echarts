import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 引入全局样式
import '@/assets/css/global.css'
// 引入字体文件
import '@/assets/font/iconfont.css'
// 请求基准路径的配置
axios.defaults.baseURL = 'http://127.0.0.1:8888/api'

// 将全局的echarts对象挂载到vue的原型对象上
Vue.prototype.$echarts = window.echarts
// 将axios挂载到Vue原型上
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
