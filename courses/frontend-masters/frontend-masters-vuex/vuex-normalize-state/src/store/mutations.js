const selectLocation = (state, payload) => {
  state.selectedLocation = payload;
};

const selectMachine = (state, payload) => {
  state.selectedMachine = payload;
};

const lockdown = (state, payload) => {
  state.machines = payload.machines;
  payload.isAlreadyLockedDown
    ? state.lockedDownLocations.splice(payload.lockedDownLocationInd, 1)
    : state.lockedDownLocations.push(payload.neighborhood);
};

export default {
  selectLocation,
  selectMachine,
  lockdown
};
