<template>
  <el-container style="background-color: white">
    <el-header>
      <el-image
          style="height:70px"
          :src="imgUrl"
          @click="goHome"
      ></el-image>
      <template v-if='!visible' >
        <el-button
            id="register-button"
            @click="goRegister"
        >注册
        </el-button>
        <el-button
            id="login-button"
            @click="goLogin"
        >登录
        </el-button>
      </template>
      <template v-else>
        <img :src="getPic" class="img" @click="goUser"/>
      </template>
    </el-header>
    <el-scrollbar>
    <el-container style="width: 100%" >
      <el-aside style="width: 120px;">
        <el-menu
            class="el-menu-vertical-demo"
            background-color="#3256a7"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelect"
        >
          <el-row></el-row>
          <el-menu-item index="data">数据</el-menu-item>
          <el-menu-item index="tool">工具</el-menu-item>
          <el-menu-item index="task">任务</el-menu-item>
          <el-menu-item index="project">项目</el-menu-item>
          <el-menu-item index="help">帮助</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="margin-left: 120px;background-color: white;min-width: 1100px">
        <router-view ></router-view>
      </el-main>
    </el-container>
    </el-scrollbar>
    <el-footer>
      <h2 class="footerTop">
        <i>Open Geographic Modeling and Simulation</i>
      </h2>
      <p class="footerBottom">
        Copyright © 2011-2021 OpenGMS. All rights reserved.
      </p>
    </el-footer>
  </el-container>

</template>

<script>
export default {
  name: "Navigation",
};
</script>


<script setup>
import { computed, defineComponent, ref } from "vue";
import { User as UserIcon } from "@element-plus/icons";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const imgUrl = ref(require("@/assets/images/nnu_geodata.png"));
const visible = computed(() => {
  let id = store.getters['user/getUserId']
  return  (id && id != '') ? true : false
})
const user = computed(() => {
  return store.getters["user/getUser"];
});
const getPic=computed(()=>{
  return "/api/user/image/"+user.value.id;
});
const handleSelect = (key, keyPath) => {
  // 在这里改路由
  router.push("/" + keyPath[0]);
};
const goUser=()=>{
  router.push("/info")
}
const goHome=()=>{
  router.push("/data")
}
const goRegister=()=>{
  router.push("/register")
}
const goLogin=()=>{
  router.push("/login")
}
</script>
<style scoped>
.img {
  width: 70px;
  height: 70px;
  position: absolute;
  right: 5%;
  border-radius: 100px;
}
.el-menu-vertical-demo{
  margin-top: 70px;
  height: calc(100vh - 70px);
  padding-left: 20px;
}
.el-menu-item{
  font-size: 17px;
}


#user-icon {
  position: absolute;
  width: 50px;
  left: 95%;
  margin-top: 14px;
}
#register-button{
  position: absolute;
  left: 90%;
  margin-top: 14px;
}
#login-button{
  position: absolute;
  left: 95%;
  margin-top: 14px;
}
.el-header{
  border-bottom: 1px solid darkgray;
  background-color: white;
  height: 70px;
}
.el-footer{
  height: 60px;
  background-color: #fefded;
  padding-top: 15px;
}
.footerTop {
  text-align: center;
  color: #7e6666;
  font-weight: bold;
  font-size: 18px;
}

.footerBottom {
  text-align: center;
  color: #7e6666;
  font-size: 0.8em;
}
</style>

