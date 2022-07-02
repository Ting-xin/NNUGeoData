<template>
  <div id="map"></div>
</template>
<script setup>
import mapboxgl from "mapbox-gl";
import {onMounted} from "vue";

const initMap= () => {
  mapboxgl.accessToken =
      "pk.eyJ1Ijoid3lqcSIsImEiOiJjbDBnZDdwajUxMXRzM2htdWxubDh1MzJrIn0.2e2_rdU2nOUvtwltBIZtZg";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [120, 32],
    zoom: 2,
  });
  console.log(map)
}
onMounted(()=>{
  initMap();
})
</script>
<style scoped>
#map{
  width: 100%;
  height: 800px;
}
</style>
