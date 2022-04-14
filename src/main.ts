import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ui from './ui';
import directives from './directives';

Vue.use(ui);
Vue.use(directives);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
