<template>
  <div class="info">
    <div class="machine-information">
      <h3>Operator</h3>
      <p>Scruffy</p>
      <h3>Primary Machine</h3>
      <p>{{ primaryMachine }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "OperatorView",
  props: {
    primaryMachine: String
  }
};
</script>

<style lang="scss" scoped>
.info {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.machine-information {
  p {
    font-size: 2em;
  }

  span {
    position: absolute;
  }
}

.logout-btn {
  position: absolute;
  top: 0;
  right: -28px;
  border: none;
  padding: 12px;
  margin: 15px;
  color: white;
  width: 40px;
  height: 40px;
  background: none;
  transition: width 0.35s;
  -webkit-transition: width 0.35s;
  overflow: hidden;

  &:hover {
    width: 110px;
    cursor: pointer;

    & .logout-btn--text {
      opacity: 0.9;
    }

    & svg {
      transform: translate(-32px, -7px);
    }
  }
}

.logout-btn--text {
  font-size: 1.2em;
  position: absolute;
  right: 3px;
  bottom: 10px;
  overflow: hidden;
  letter-spacing: 1px;
  opacity: 0;
  transition: opacity 0.45s;
  -webkit-transition: opacity 0.35s;
  color: white;
}

svg {
  transform: translate(-6px, -7px);
  width: 30px;
  transition: transform 0.35s;
  -webkit-transition: transform 0.35s;
}

.cls-1 {
  fill: none;
}

.cls-1,
.cls-2 {
  stroke: #fff;
  stroke-miterlimit: 10;
  stroke-width: 5px;
}

.cls-3 {
  fill: #fff;
}

.cls-2 {
  fill: #000;
}
</style>
