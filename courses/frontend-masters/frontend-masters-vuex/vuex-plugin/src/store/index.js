import Vuex from "vuex";
import Vue from "vue";
import persistDataPlugin from "../plugins/persist-data";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [persistDataPlugin],
  state: {
    machineName: "Wash Bucket",
    lastServiced: new Date()
  },
  getters: {
    serviceDate(state) {
      return state.lastServiced.toLocaleString("default", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    },
    serviceTime(state) {
      return state.lastServiced.toLocaleString("default", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short"
      });
    }
  },
  actions: {
    serviceMachine({ commit }) {
      commit("updateServiceDate", new Date());
    }
  },
  mutations: {
    updateServiceDate(state, payload) {
      state.lastServiced = payload;
    }
  }
});
