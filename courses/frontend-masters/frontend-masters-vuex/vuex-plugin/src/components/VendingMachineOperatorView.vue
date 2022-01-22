<template>
  <div class="machine-information">
    <div>
      <h3>Operator</h3>
      <p>Scruffy</p>
      <h3>Primary Machine</h3>
      <p>Wash Bucket</p>
      <span>
        Last Serviced:
        {{ lastServiced }}
      </span>
    </div>
    <button class="service-btn" @click="serviceMachine">Service</button>
  </div>
</template>

<script>
export default {
  name: "VendingMachineUserView",
  computed: {
    lastServiced() {
      return this.$store.getters.serviceTime;
    }
  },
  methods: {
    serviceMachine() {
      this.$store.dispatch("serviceMachine");
    }
  }
};
</script>

<style lang="scss" scoped>
.machine-information {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  p {
    font-size: 2em;
  }
}

.service-btn {
  align-self: flex-start;
}
</style>
