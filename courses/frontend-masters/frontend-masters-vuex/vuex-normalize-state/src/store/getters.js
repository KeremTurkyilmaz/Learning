const getInventory = state => {
  const machine = state.machines.filter(
    machine => machine.name === state.selectedMachine
  )[0];
  return machine ? machine.inventory : [];
};

const machinesInLocation = state => {
  return state.machines.filter(
    machine => machine.location === state.selectedLocation
  );
};

const lastStockedAt = state => {
  const machine = state.machines.filter(
    machine => machine.name === state.selectedMachine
  );
  return machine.length > 0 ? machine[0].lastStocked : "";
};

const isLocationLockeddown = state => {
  const loc = state.lockedDownLocations.filter(
    location => state.selectedLocation === location
  );
  return loc.length > 0;
};

export default {
  getInventory,
  machinesInLocation,
  lastStockedAt,
  isLocationLockeddown
};
