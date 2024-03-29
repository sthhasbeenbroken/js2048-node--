import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
Vue.config.productionTip = false
Vue.prototype.bus = new Vue()
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(VueCookies)
new Vue({
  router,
  store,
  render: h => h(App),
  components: { App },
}).$mount('#app')
