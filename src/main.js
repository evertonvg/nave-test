import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import VueMeta from 'vue-meta';
import store from './store'

Vue.use(VueMeta);

Vue.config.productionTip = false

new Vue({
  // store,
  router:Router,
  render: h => h(App),
}).$mount('#app')
