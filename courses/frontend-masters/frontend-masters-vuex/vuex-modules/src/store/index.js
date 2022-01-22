import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import machine from './machine';
import inventory from './inventory';

export default new Vuex.Store({
  namespaced: true,
  modules: {
    machine,
    inventory
  },
  state: {},
  getters: {}
});
