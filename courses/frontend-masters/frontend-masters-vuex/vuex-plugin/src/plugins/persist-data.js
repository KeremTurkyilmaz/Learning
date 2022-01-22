const persistTime = 24 * 60 * 60 * 1000; // 1 day

const persistDataPlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'updateServiceDate') {
      let record = {
        dateTime: state.lastServiced,
        persistFor: state.lastServiced.getTime() + persistTime
      };
      try {
        window.localStorage.setItem('last_serviced', JSON.stringify(record));
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  });
  store.subscribeAction({
    before: (action, state) => {
      if (action.type === 'serviceMachine') {
        const timeLapsed = new Date().getTime() - state.lastServiced.getTime();
        console.log(`${timeLapsed / 1000} seconds passed`);
        console.log('Before');
        console.log(state.lastServiced);
      }
    },
    after: (action, state) => {
      if (action.type === 'serviceMachine') {
        console.log('After');
        console.log(state.lastServiced);
      }
    }
  });
};

export default persistDataPlugin;
