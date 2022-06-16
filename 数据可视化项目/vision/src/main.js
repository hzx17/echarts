import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import SocketService from '@/utils/socket_service'
// 引入全局样式
import '@/assets/css/global.css'
// 引入字体文件
import '@/assets/font/iconfont.css'
// 请求基准路径的配置
axios.defaults.baseURL = 'http://127.0.0.1:8888/api'
SocketService.Instance.connect() // 完成服务端websocket连接
// 挂载到原型，通过this.$socket就可以使用到socket_service.js中定义的方法
Vue.prototype.$socket = SocketService.Instance
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
