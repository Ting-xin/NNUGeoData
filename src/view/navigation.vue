<template>
  <el-container>
    <el-heander>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#f5f5f5"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-image
          style="width: 360px; margin-left: 10px"
          :src="imgUrl"
          fit="scale-down"
        ></el-image>
        <span class="border-style"></span>
        <el-menu-item index="data">数据</el-menu-item>
        <el-menu-item index="tool">工具</el-menu-item>
        <el-menu-item index="task">任务</el-menu-item>
        <el-menu-item index="project">项目</el-menu-item>
        <el-menu-item index="help">帮助</el-menu-item>

        <template v-if='!visible'>
        <el-menu-item
          index="register"
          style="margin-left: 50%"
          >注册</el-menu-item
        >
        <el-menu-item index="login" 
          >登录</el-menu-item
        >
        </template>
        <template v-else>
        <el-menu-item
          index="user"
          style="margin-left: 50%"
        >
          <user-icon
            index="user"
            id="user-icon"
            style="width: 40px"
          />
        </el-menu-item>
        </template>
      </el-menu>
    </el-heander>
    <el-main class="body-main">
      <router-view style="height: 100%"></router-view>
    </el-main>
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
const handleSelect = (key, keyPath) => {
  // 在这里改路由
  router.push("/" + keyPath[0]);
};
</script>
<style scoped>
#user-icon {
  position: absolute;
  width: 50px;
  left: 95%;
}
.border-style {
  margin-right: 20px;
}
.el-header,
.el-footer {
  background-color: #1d1e1f;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 15px;
  height: 80px;
}

.footerTop {
  text-align: center;
  color: white;
  font-weight: bold;
  margin-top: 10px;
}

.footerBottom {
  text-align: center;
  color: white;
  font-size: 0.8em;
}

.body-main {
  height: calc(100vh - 141px);
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
}

.el-menu--horizontal > .el-menu-item {
  font-size: 20px;
  color: black;
}

#user-icon[data-v-1632b64f] {
  position: unset;
}

.el-main {
  --el-main-padding: 10px;
}
</style>