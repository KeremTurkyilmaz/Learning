<template>
  <div class="wrapper">
    <div
      :style="{ display: isDispensing ? 'block' : 'none' }"
      class="loading-state"
    >
      <Gears />
      <h2>Dispensing...</h2>
    </div>
    <div
      :style="{ display: isRestocking ? 'block' : 'none' }"
      class="loading-state"
    >
      <Cart />
      <h2>Restocking</h2>
    </div>
    <div
      :style="{ display: isCheckingMachine ? 'block' : 'none' }"
      class="loading-state"
    >
      <Machine />
      <h2>Checking Machine State</h2>
    </div>
    <div :style="{ display: isInLoadingState ? 'none' : 'block' }">
      <Chips />
      <div class="product-name">
        <span>Lays</span>
        <h2>Potato Chips</h2>
        <p>Product Code</p>
        <span>76424233</span>
      </div>
    </div>
    <section
      class="action-section"
      :style="{ filter: isRestocking ? 'contrast(0.5)' : 'none' }"
    >
      <div class="supply">
        <div class="supply-count">
          <span class="count">Supply</span>
          <h4>{{ supply }}</h4>
        </div>
      </div>
      <div class="buttons">
        <button class="restock-btn" @click="restock" :disabled="supply === 40">
          Restock
        </button>
        <button class="dispense-btn" @click="dispense" :disabled="supply === 0">
          Dispense
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import Gears from "./Gears.vue";
import Cart from "./Cart.vue";
import Chips from "./Chips.vue";
import Machine from "./Machine.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "VendingMachineAdmin",
  components: {
    Gears,
    Cart,
    Chips,
    Machine
  },
  computed: {
    ...mapState([
      "supply",
      "isRestocking",
      "isDispensing",
      "isCheckingMachine"
    ]),
    isInLoadingState() {
      return this.isRestocking || this.isDispensing || this.isCheckingMachine;
    }
  },
  methods: {
    ...mapActions({
      dispense: "dispense",
      restock: "fetchFromInventory"
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrapper {
  border-radius: 10px;
  background: #fff;
  border: 1px solid black;
  width: 350px;
  height: 500px;
  position: relative;
}

svg {
  position: relative;
  margin: 0 auto;
  margin-top: 100px;
  display: block;
}

.product-name {
  position: relative;
  margin: 0 auto;
  width: 55%;
  & p {
    display: inline-block;
  }
  & h2 {
    font-size: 30px;
    margin: 0;
  }
}

.action-section {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 30px;
  position: relative;
  height: 200px;
  background: #008a56;
  color: white;
  border-radius: 0 0 10px 10px;
  & .buttons {
    width: 150px;
  }
}

.supply-count {
  height: 100px;
  width: 100px;
  background: #74b39c;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    position: absolute;
    top: -30px;
    left: 30%;
  }
  & h4 {
    font-size: 40px;
  }
}

.restock-btn,
.dispense-btn {
  width: 150px;
  cursor: pointer;
  font-size: 20px;
  color: white;
  background: #ffb232;
  padding: 10px 30px;
  border: none;
  border-radius: 10px;
  &:disabled {
    opacity: 0.4;
  }
}

.dispense-btn {
  margin-top: 10px;
  background: red;
}

.loading-state {
  text-align: center;
}
</style>
