<template>
  <el-container>
    <el-heander>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-image style='width: 200px' :src="imgUrl" fit="scale-down"></el-image>
        <span class="border-style"></span>
        <el-menu-item index="Home">Home</el-menu-item>
        <el-menu-item index="Projects">Projects</el-menu-item>
        <el-menu-item index="Resources">Resources</el-menu-item>
        <el-menu-item index="Help">Help</el-menu-item>
        <user-icon id="user-icon" style="width: 50px" />
      </el-menu>
    </el-heander>
    <el-main>
      <router-view></router-view>  
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
import { defineComponent, ref } from "vue";
import { User as UserIcon } from "@element-plus/icons";

export default defineComponent({
  components: {
    UserIcon,
  },
  setup() {
    const activeIndex = ref("1");
    const activeIndex2 = ref("1");
    const imgUrl = require("@/assets/images/OGMS.png");

    const handleSelect = (key, keyPath) => {    // 在这里改路由
      if(keyPath[0] != 'Help')  window.location.href = '/'
      else window.location.href = '/' + keyPath[0]
    };
    return {
      activeIndex,
      activeIndex2,
      imgUrl,
      handleSelect,
    };
  },
});
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
.el-footer{
  background-color: #515a6e;
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

.el-main {
  height: calc(100vh - 144px);
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>