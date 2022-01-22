const inventory = {
  namespaced: true,
  state: {
    supply: [
      {
        productName: 'Yay Chips',
        supply: 10
      },
      {
        productName: 'Chips of Cookies',
        supply: 15
      },
      {
        productName: 'Bag of Bretzels',
        supply: 3
      },
      {
        productName: 'Corn Crisps',
        supply: 11
      },
      {
        productName: 'Triangle Chips',
        supply: 2
      },
      {
        productName: 'Cheese Dust',
        supply: 0
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    isSupplyLow(state) {
      return state.supply.filter(item => item.supply <= 5);
    }
  }
};

export default inventory;
