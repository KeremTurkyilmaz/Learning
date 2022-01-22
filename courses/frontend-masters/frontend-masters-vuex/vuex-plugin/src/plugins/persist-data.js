const persistTime = 24 * 60 * 60 * 1000; // 1 day

const persistDataPlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === "updateServiceDate") {
      let record = {
        dateTime: state.lastServiced,
        persistFor: state.lastServiced.getTime() + persistTime
      };
      try {
        window.localStorage.setItem("last_serviced", JSON.stringify(record));
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  });
  store.subscribeAction(action => {
    console.log(action.type);
    console.log(action.payload);
  });
};

export default persistDataPlugin;
