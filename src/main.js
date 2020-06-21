import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
// 1. 安装fastClick npm instal fastclick --save
// 2. 引入
import fastClcik from 'fastclick'
import VueLoadLazy from 'vue-lazyload'

Vue.use(toast)
// 使用vue懒加载
Vue.use(VueLoadLazy, {
  loading: require('../src/assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

// 3.解决移动端300ms的延迟,调用attach方法
fastClcik.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
