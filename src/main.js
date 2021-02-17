import Vue from 'vue';
import Notifications from 'vue-notification';
import currency from './filters/currency';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/assets/scss/base.scss';

Vue.filter('currency', currency);
Vue.use(Notifications);
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount('#app');
