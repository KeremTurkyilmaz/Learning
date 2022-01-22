var cloneDeep = require("lodash.clonedeep");

const state = {
  selectedMachine: null,
  selectedLocation: null,
  lockedDownLocations: [],
  machines: [
    {
      name: "Leela",
      lastStocked: "Feb 2019",
      condition: "Working",
      location: "Lake View",
      latlng: [-87.6554288, 41.94705],
      inventory: [
        {
          productName: "Yay Chips",
          supply: 0
        },
        {
          productName: "Chips of Cookies",
          supply: 1
        },
        {
          productName: "Bag of Bretzels",
          supply: 3
        },
        {
          productName: "Corn Crisps",
          supply: 11
        },
        {
          productName: "Triangle Chips",
          supply: 2
        },
        {
          productName: "Cheese Dust",
          supply: 0
        }
      ]
    },
    {
      name: "Hermes",
      lastStocked: "Feb 2019",
      condition: "Working",
      location: "Wicker Park",
      latlng: [-87.67745208740234, 41.910457611083984],
      inventory: [
        {
          productName: "Yay Chips",
          supply: 10
        },
        {
          productName: "Chips of Cookies",
          supply: 15
        },
        {
          productName: "Bag of Bretzels",
          supply: 3
        },
        {
          productName: "Corn Crisps",
          supply: 11
        },
        {
          productName: "Triangle Chips",
          supply: 2
        },
        {
          productName: "Cheese Dust",
          supply: 0
        }
      ]
    },
    {
      name: "Bender",
      lastStocked: "Feb 2019",
      condition: "Working",
      location: "Lake View",
      latlng: [-87.6554288, 41.94705],
      inventory: [
        {
          productName: "Yay Chips",
          supply: 10
        },
        {
          productName: "Chips of Cookies",
          supply: 15
        },
        {
          productName: "Bag of Bretzels",
          supply: 3
        },
        {
          productName: "Corn Crisps",
          supply: 11
        },
        {
          productName: "Triangle Chips",
          supply: 2
        },
        {
          productName: "Cheese Dust",
          supply: 0
        }
      ]
    },
    {
      name: "Farnsworth",
      lastStocked: "Feb 2019",
      condition: "Working",
      location: "Lake View",
      latlng: [-87.6554288, 41.94705],
      inventory: [
        {
          productName: "Yay Chips",
          supply: 10
        },
        {
          productName: "Chips of Cookies",
          supply: 15
        },
        {
          productName: "Bag of Bretzels",
          supply: 3
        },
        {
          productName: "Corn Crisps",
          supply: 11
        },
        {
          productName: "Triangle Chips",
          supply: 2
        },
        {
          productName: "Cheese Dust",
          supply: 0
        }
      ]
    },
    {
      name: "Fry",
      lastStocked: "Feb 2019",
      condition: "Working",
      location: "Wicker Park",
      latlng: [-87.67745208740234, 41.910457611083984],
      inventory: [
        {
          productName: "Yay Chips",
          supply: 10
        },
        {
          productName: "Chips of Cookies",
          supply: 15
        },
        {
          productName: "Bag of Bretzels",
          supply: 3
        },
        {
          productName: "Corn Crisps",
          supply: 11
        },
        {
          productName: "Triangle Chips",
          supply: 2
        },
        {
          productName: "Cheese Dust",
          supply: 0
        }
      ]
    },
    {
      name: "Wash Bucket",
      lastStocked: "Jan 2020",
      condition: "Working",
      location: "Boystown",
      latlng: [-87.6492669, 41.9438833],
      inventory: [
        {
          productName: "Yay Chips",
          supply: 10
        },
        {
          productName: "Chips of Cookies",
          supply: 15
        },
        {
          productName: "Bag of Bretzels",
          supply: 3
        },
        {
          productName: "Corn Crisps",
          supply: 11
        },
        {
          productName: "Triangle Chips",
          supply: 2
        },
        {
          productName: "Cheese Dust",
          supply: 0
        }
      ]
    }
  ]
};

export const getState = () => cloneDeep(state);

export default getState();
