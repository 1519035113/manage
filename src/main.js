import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/global.css'
import './assets/fonts/iconfont.css'

// import axios from 'axios'
// axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

// axios.interceptors.request.use(config => {
//   let token = localStorage.getItem('token')

//   config.headers.Authorization = token

//   return config
// })

import axios from './utils/request'

Vue.prototype.$axios = axios
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor)


import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table',TreeTable)


// 配置element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 配置echarts
import echarts from "echarts"
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (!token) {
    if (to.path != '/login') {
      next('/login')
    } else {
      next()
    }
  } else {
    if (to.path == '/login') {
      next('/home')
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')