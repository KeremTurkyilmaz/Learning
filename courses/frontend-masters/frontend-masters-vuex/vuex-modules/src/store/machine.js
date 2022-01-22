const machine = {
  namespaced: true,
  state: {
    machineName: 'Bender',
    lastServiced: new Date(),
    machineCondition: 'workig'
  },
  mutations: {
    updateServiceDateTime(state, payload) {
      state.lastServiced = payload;
    }
  },
  actions: {
    serviceMachine({ commit }) {
      commit('updateServiceDateTime', new Date());
    }
  },
  getters: {
    serviceDateTime(state) {
      const date = state.lastServiced.toLocaleString('default', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      const time = state.lastServiced.toLocaleString('default', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });
      return {
        date,
        time
      };
    },
    isMachineWorking(state) {
      return state.machineCondition === 'working';
    }
  }
};

export default machine;
