<template>
  <div id="app">
    <VendingMachineAdmin />
  </div>
</template>

<script>
import VendingMachineAdmin from "./components/VendingMachineAdmin";

export default {
  name: "App",
  components: {
    VendingMachineAdmin
  }
};
</script>

<style>
body {
  background: #333;
  font-family: "Gothic A1", sans-serif;
  display: flex;
  justify-content: center;
}

h3,
p {
  margin: 0;
  padding: 0;
}
.service-btn {
  width: 100px;
  cursor: pointer;
  font-size: 20px;
  color: white;
  background: #ffb232;
  padding: 10px;
  border: none;
  border-radius: 10px;
  margin-top: 30px;
}
</style>
