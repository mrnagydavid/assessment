import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import New from './views/New.vue';
import Edit from './views/Edit.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new',
      name: 'new',
      component: New
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit
    }
  ]
})
