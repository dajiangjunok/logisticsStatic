import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './theme/element/theme/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
