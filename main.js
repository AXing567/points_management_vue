import App from './App'
import $cache from '@/common/cache.js'
import $helper from '@/common/helper.js'
import $config from '@/common/index.config.js'
import $req from '@/common/request.js'
import $util from '@/common/util.js'
Vue.prototype.$cache = $cache
Vue.prototype.$helper = $helper
Vue.prototype.$config = $config
Vue.prototype.$req = $req
Vue.prototype.$util = $util

Vue.prototype.uploadPerson = {};  // 用于上传用户积分集（多个用户的详细积分变动信息）meeting-participants页面和administrator-add-meeting页面交互

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

 
