import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./auth";
import { currencies } from "./currencies";
import { details } from "./details";
import { volumes } from "./volumes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    currencies,
    details,
    volumes
  },
});
