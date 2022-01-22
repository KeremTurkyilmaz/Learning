<template>
  <div class="wrapper">
    <a href="" class="navigation" @click.prevent="goBack">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.34 15.13">
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path class="cls-1" d="M11.13,7.77l18.18-.21" />
            <polygon points="0 7.57 13.1 0 13.1 15.13 0 7.57" />
          </g>
        </g>
      </svg>
      <span>Go Back</span>
    </a>
    <section class="map-section" ref="mapCanvas"></section>
    <section class="action-section">
      <div class="machine-information">
        <div class="machine-id">
          <h3>Location</h3>
          <p>{{ selectedNeighborhood }}</p>
        </div>
        <div class="machine-state">
          <h3>Machines Available</h3>
          <p>{{ allMachines.length }}</p>
        </div>
      </div>
      <button class="service-btn" @click="lockdown">
        {{ isLocationLockeddown ? "Unlock" : "Lock" }}
      </button>
    </section>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import geojson from "../../public/chicagoNeighborhoods.json";

export default {
  name: "LocationView",
  props: {
    neighborhood: String
  },
  data() {
    return {
      map: null,
      neighborhoods: geojson,
      selectedNeighborhood: null
    };
  },
  mounted() {
    const neighborhood = this.neighborhood
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    this.selectedNeighborhood = neighborhood;
    this.$store.dispatch("selectLocation", neighborhood);

    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2hvcnRkaXYiLCJhIjoiY2l3OGc5YmE5MDJzZjJ5bWhkdDZieGdzcSJ9.1z-swTWtcCHYI_RawDJCEw";

    var map = new mapboxgl.Map({
      container: this.$refs.mapCanvas, // container id
      style: "mapbox://styles/mapbox/light-v8", // stylesheet location
      center: [-87.624421, 41.875562],
      zoom: 9 // starting zoom
    });
    map.on("load", () => {
      map.addSource("chi-neighborhoods", {
        type: "geojson",
        data: this.neighborhoods
      });
      map.addLayer({
        id: "chi-neighborhoods",
        type: "line",
        source: "chi-neighborhoods",
        paint: {
          "line-color": "#877b59",
          "line-width": 1
        },
        filter: ["==", "PRI_NEIGH", this.selectedNeighborhood]
      });
      map.flyTo({
        center: this.allMachines[0].latlng || [-87.624421, 41.875562],
        zoom: 12
      });
    });
  },
  computed: {
    allMachines() {
      return this.$store.getters.machinesInLocation;
    },
    isLocationLockeddown() {
      return this.$store.getters.isLocationLockeddown;
    }
  },
  methods: {
    lockdown() {
      this.$store.dispatch("toggleLockdown", {
        neighborhood: this.selectedNeighborhood,
        toLockdown: !this.$store.getters.isLocationLockeddown
      });
    },
    goBack() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  border-radius: 10px;
  background: #f4f4f6;
  border: 1px solid black;
  width: 350px;
  height: 627px;
  position: relative;
}

.navigation {
  position: absolute;
  top: 10px;
  left: 10px;
  text-decoration: none;
  & span {
    padding-left: 10px;
  }
}

.map-section {
  margin-top: 50px;
  height: 61%;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.action-section {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  height: 200px;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  background: #008a56;
  color: white;
  border-radius: 0 0 10px 10px;
  position: absolute;
  bottom: 0;
  & .service-btn {
    width: 110px;
    cursor: pointer;
    font-size: 20px;
    color: white;
    background: #ffb232;
    border: none;
    border-radius: 10px;
    align-self: flex-start;
    margin-top: 30px;
  }
}

.machine-information {
  align-self: flex-start;
  margin-top: 30px;

  h3,
  p {
    margin: 0;
  }
  p {
    font-size: 2em;
  }
}

.machine-state {
  margin-top: 20px;
}

svg {
  width: 30px;
}

.cls-1 {
  fill: none;
  stroke: #000;
  stroke-miterlimit: 10;
  stroke-width: 5px;
}
</style>
