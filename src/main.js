import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 配置axios的信息
import axios from "@/utils/request"
Vue.prototype.$axios = axios;

// 配置element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 配置echarts
import echarts from "echarts"
Vue.prototype.$echarts = echarts

import './permission'//引入路由守卫

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
