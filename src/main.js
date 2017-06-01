// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

import Goods from './components/goods/goods.vue';
import Ratings from './components/ratings/ratings.vue';
import Seller from './components/seller/seller.vue';
import './common/sytlus/index.styl';
Vue.config.productionTip = false;
const routes = [
  {path: '/goods', component: Goods},
  {path: '/ratings', component: Ratings},
  {path: '/seller', component: Seller}
];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});
/* eslint-disable no-new */
new Vue({
  router,
  template: '<App></App>',
  components: {App}
}).$mount('#app');
 router.push('/goods');

