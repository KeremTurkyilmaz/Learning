import Vue from 'vue';
import Router from 'vue-router';
import LoginScreen from '../components/VendingMachineLogin.vue';
import AdminScreen from '../components/VendingMachineAdmin.vue';
import InventoryScreen from '../components/InventoryView.vue';
import store from '../store';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'AdminScreen',
    component: AdminScreen,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/login',
    name: 'LoginScreen',
    component: LoginScreen
  },
  {
    path: '/inventory',
    name: InventoryScreen,
    component: InventoryScreen,
    meta: {
      authRequired: true
    }
  }
];

const router = new Router({
  routes,
  mode: 'history'
});

router.beforeEach((to, _from, next) => {
  const authRequired = to.matched.some(route => route.meta.authRequired);
  if (!authRequired) {
    return next();
  }
  if (store.getters['isLoggedIn']) {
    return next();
  } else {
    next('/login');
  }
});

export default router;
