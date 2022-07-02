<template>
  <div class="top-tool-bar">
      <span class="top-button" style="  border-bottom: 2px solid #3957a9;">
        <el-icon :size="18" style="color: sandybrown"><Expand/></el-icon>
        <span>详细信息</span>
      </span>
      <span class="top-button">
        <el-icon :size="18" style="color: sandybrown"><Tools/></el-icon>
        <span>工具箱</span>
      </span>
      <span class="top-button">
        <el-icon :size="18" style="color: sandybrown"><FolderAdd/></el-icon>
        <span>添加</span>
      </span>
      <span class="top-button">
        <el-icon :size="18" style="color: brown"><Edit/></el-icon>
        <span>编辑</span>
      </span>
      <span class="top-button">
        <el-icon><Document style="color: mediumpurple"/></el-icon>
        <span>保存</span>
      </span>
  </div>
  <div class="side-map-container">
    <div class="sideBar">
      <div class="layerBar">
        <el-button  :icon="Document" class="side-button">图层</el-button>
      </div>
    </div>
    <div id="map"></div>
  </div>

</template>
<script setup>
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import {onMounted} from "vue";
import {Document,FolderAdd,Edit,Expand,CaretLeft,Tools} from "@element-plus/icons";
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
.top-tool-bar{
  background-color: #f7f8f8;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 15px;
}
.side-map-container{
  display: flex;
  padding-left: 15px;
}
.sideBar{
  width: 15%;
  display: flex;
  position: relative;
}
.layerBar{
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: space-between;
}
.side-button{
  border: none;
  padding: 0;
}
.top-button{
  display: flex;
  align-items: center;
  margin-right: 15px;
  line-height: 2rem;

}
#map{
  width: 85%;
  height: calc(100vh - 140px);
}
</style>
