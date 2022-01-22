import Vue from "vue";
import Router from "vue-router";
// import store from "../store";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "AdminScreen",
    component: () =>
      import(
        /* webpackChunkName: "admin" */ "../components/VendingMachineAdmin.vue"
      )
  },
  {
    path: "/inventory",
    name: "InventoryScreen",
    props: route => ({ machine: route.query.machine }),
    component: () =>
      import(/* webpackChunkName: "admin" */ "../components/InventoryView.vue")
  },
  {
    path: "/location",
    name: "LocationScreen",
    props: route => ({ neighborhood: route.query.neighborhood }),
    component: () =>
      import(/* webpackChunkName: "admin" */ "../components/LocationView.vue")
  }
];

const router = new Router({
  routes,
  mode: "history"
});

export default router;
