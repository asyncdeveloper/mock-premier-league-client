import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './assets/styles.scss'

Vue.config.productionTip = false;

Vue.use(VeeValidate);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
