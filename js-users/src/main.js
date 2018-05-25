import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false

Vue.filter('date', function (value) {
  const date = new Date(value);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
});

Vue.filter('limit', function (value, length = 10) {
  if (typeof value === 'string' && value.length > length) {
    return `${value.slice(0, length-3)}...`;
  } else {
    return value;
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

