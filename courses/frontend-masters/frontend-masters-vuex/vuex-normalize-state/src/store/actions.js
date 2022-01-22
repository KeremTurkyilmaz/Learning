const init = () => {
  console.log("initializing code here");
};

const selectMachine = ({ commit }, payload) => {
  commit("selectMachine", payload);
};

const selectLocation = ({ commit }, payload) => {
  commit("selectLocation", payload);
};

const toggleLockdown = ({ state, commit }, payload) => {
  let updateMachines = [];
  state.machines.map(machine => {
    const shldLockDown =
      machine.location === payload.neighborhood && payload.toLockdown;
    updateMachines.push({
      ...machine,
      condition: shldLockDown ? "Locked Down" : "Working"
    });
  });
  const isAlreadyLockedDown =
    state.lockedDownLocations.indexOf(payload.neighborhood) > -1;
  commit("lockdown", {
    machines: updateMachines,
    isAlreadyLockedDown,
    neighborhood: payload.neighborhood
  });
};

export default {
  init,
  selectLocation,
  selectMachine,
  toggleLockdown
};
