<template>
  <div class="wrapper">
    <section class="machine-list">
      <h2>Machines</h2>
      <div v-for="(machine, idx) in machines" :key="idx">
        <VendingMachineItem :machine="machine" />
      </div>
    </section>
    <section class="action-section">
      <OperatorView :primaryMachine="primaryMachine" />
    </section>
  </div>
</template>

<script>
import OperatorView from "./OperatorView";
import VendingMachineItem from "./VendingMachineItem";

export default {
  name: "VendingMachineAdmin",
  components: {
    OperatorView,
    VendingMachineItem
  },
  data() {
    return {
      primaryMachine: "Wash Bucket"
    };
  },
  computed: {
    machines() {
      return this.$store.state.machines;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
