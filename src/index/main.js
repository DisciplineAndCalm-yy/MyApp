import '@babel/polyfill'
import Vue from 'vue'
import '../plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Loading from "./views/aliplayer/Loading.vue"

Vue.component('Loading', Loading);
Vue.use(ElementUI)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')