<template>
  <div class="wrapper">
    <section class="machine-list">
      <h2>Machines</h2>
      <div class="machine-card" v-for="(machine, idx) in machines" :key="idx">
        <VendingMachineItem :machine="machine" />
      </div>
    </section>
    <section class="action-section">
      <OperatorView />
    </section>
  </div>
</template>

<script>
import OperatorView from './OperatorView';
import VendingMachineItem from './VendingMachineItem';

export default {
  name: 'VendingMachineAdmin',
  components: {
    OperatorView,
    VendingMachineItem
  },
  data() {
    return {
      machines: [
        {
          id: 0,
          name: 'Leela',
          lastServiced: 'Feb 2019',
          condition: 'working'
        },
        {
          id: 1,
          name: 'Hermes',
          lastServiced: 'Feb 2019',
          condition: 'working'
        },
        {
          id: 2,
          name: 'Bender',
          lastServiced: 'Feb 2019',
          condition: 'working'
        },
        {
          id: 3,
          name: 'Farnsworth',
          lastServiced: 'Feb 2019',
          condition: 'retired'
        },
        {
          id: 4,
          name: 'Fry',
          lastServiced: 'Feb 2019',
          condition: 'broken'
        },
        {
          id: 5,
          name: 'Wash Bucket',
          lastServiced: 'Jan 2020',
          condition: 'working'
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content {
  margin-top: 100px;
}

.wrapper {
  border-radius: 10px;
  background: #f4f4f6;
  border: 1px solid black;
  width: 350px;
  height: 627px;
  position: relative;
}

.machine-list {
  margin: 20px;
  overflow: scroll;
  height: 65%;
}

.action-section {
  height: 200px;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  background: #008a56;
  color: white;
  border-radius: 0 0 10px 10px;
  position: absolute;
  bottom: 0;
}
</style>
