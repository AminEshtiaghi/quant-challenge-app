import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Search from "../views/Search/Search.vue";
import Login from "../views/Auth/Login.vue";
import Constructing from "../views/Basic/Constructing.vue";
import store from '../store/index';
import {NavigationMetaData} from '../models/NavMeta';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "index",
    component: Search,
    meta: {requiredAuthenticatin: true, requiredUnauthenticatin: false } as NavigationMetaData
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {requiredAuthenticatin: false, requiredUnauthenticatin: true } as NavigationMetaData
  },
  {
    path: "/constructing",
    name: "constructing",
    component: Constructing,
    meta: {requiredAuthenticatin: false, requiredUnauthenticatin: false } as NavigationMetaData
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {

  const destinationMeta: NavigationMetaData = {
    requiredAuthenticatin: to.meta?.requiredAuthenticatin,
    requiredUnauthenticatin: to.meta?.requiredUnauthenticatin,
  };
  
  store.dispatch('auth/autoLogin');
  const isLOggedIn = store.getters['auth/isLoggedIn'];
  
  if (destinationMeta.requiredAuthenticatin && !isLOggedIn) {
    next({name: 'login'});
  } else if (destinationMeta.requiredUnauthenticatin && isLOggedIn) {
    next({name: 'index'});
  } else {
    next();
  }

});

export default router;
