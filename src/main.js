import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element'
import '@/assets/style/global.scss'
import "font-awesome/css/font-awesome.css"
import * as filters from '@/filters' 
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

// 全局注册组件

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

