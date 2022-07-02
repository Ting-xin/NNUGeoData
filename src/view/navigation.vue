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
      <el-aside style="width: 150px;">
        <el-menu
            class="el-menu-vertical-demo"
            background-color="#4c6cb2"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            @select="handleSelect"
        >
          <el-row class="collapse-nav"><el-icon class="icon-collapse" @click="handleCollapse" :size="25" style="color: white"><Fold/></el-icon></el-row>
          <el-menu-item index="data">
            <img :src="databaseIcon" style="width: 1.5em;margin-right: 10px">
            <span v-show="navNameVisible">数据</span>
          </el-menu-item>
          <el-sub-menu style="justify-content: flex-start">
            <template #title>
              <img :src="settingIcon" style="width: 1.5em;margin-right: 10px">
              <span v-show="navNameVisible">工具</span>
            </template>
            <el-menu-item style="padding-left:20px" index="tool"><img :src="addIcon" style="width: 1.5em;margin-right: 10px;"><span v-show="navNameVisible">创建工具</span></el-menu-item>
            <el-menu-item style="padding-left:20px" index="invokeTool"><img :src="useToolIcon" style="width: 1.5em;margin-right: 10px"><span v-show="navNameVisible">调用工具</span></el-menu-item>
          </el-sub-menu>
          <el-menu-item index="task"><img :src="taskIcon" style="width: 1.5em;margin-right: 10px"><span v-show="navNameVisible">任务</span></el-menu-item>
          <el-menu-item index="project"><img :src="projectIcon" style="width: 1.5em;margin-right: 10px"><span v-show="navNameVisible">项目</span></el-menu-item>
          <el-menu-item index="help"><img :src="helpIcon" style="width: 1.5em;margin-right: 10px"><span v-show="navNameVisible">帮助</span></el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="background-color: white;min-width: 1100px;padding: 0" :style="marginLeft">
        <router-view @setMainMargin="setMainMargin"></router-view>
      </el-main>
    </el-container>
    </el-scrollbar>
    <el-footer>
      <p class="footerBottom">
        Copyright © 2011-2022 OpenGMS. All rights reserved.
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
import { User as UserIcon,Fold } from "@element-plus/icons";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const setMainMargin = (data) => {
  marginLeft.value = data
  isCollapse.value = true
}

const marginLeft = ref('')
marginLeft.value = "margin-left: 150px"
const isCollapse = ref(false)
const handleCollapse = () => {
  if(isCollapse.value == false){
    isCollapse.value = true
    navNameVisible.value = false
    marginLeft.value = "margin-left: 64px"
  }else {
    isCollapse.value = false
    navNameVisible.value = true
    marginLeft.value = "margin-left: 150px"
  }
}
const navNameVisible = ref(true)

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

const addIcon = ref(require("@/assets/myicon/add.png"))
const useToolIcon = ref(require("@/assets/myicon/usetool.png"))
const settingIcon = ref(require("@/assets/myicon/setting.png"))
const databaseIcon = ref(require("@/assets/myicon/database.png"))
const taskIcon = ref(require("@/assets/myicon/task.png"))
const helpIcon = ref(require("@/assets/myicon/help.png"))
const projectIcon = ref(require("@/assets/myicon/project.png"))
</script>
<style scoped>
.collapse-nav{
  justify-content: center;
  background-color: #3256a7;
}
.icon-collapse{
  cursor: pointer;
}
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
}
/deep/.el-menu-item{
  font-size: 17px;
  padding-left: 20px;
}
/deep/.el-sub-menu__title{
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
  height: 30px;
  background-color: #fefded;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.footerBottom {
  text-align: center;
  color: #7e6666;
  font-size: 0.8em;
}
</style>

