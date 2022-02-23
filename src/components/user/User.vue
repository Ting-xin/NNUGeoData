<template>
  <div>
    <el-card class="basicInfo" style="width: 40%; height: 80%; margin: 0 auto">
      <el-form ref="form" label-width="30%" :label-position="labelPosition">
        <h4 style="font-size: initial; text-align: center; margin-bottom: 5%">
          个人信息
        </h4>
        <el-divider></el-divider>
        <el-form-item label="姓名:">
          <label>{{ $store.state.user.user.name }}</label>
        </el-form-item>
        <el-form-item label="机构:">
          <label>{{ $store.state.user.user.institution }}</label>
        </el-form-item>
        <el-form-item label="Email:">
          <label>{{ $store.state.user.user.email }}</label>
        </el-form-item>
        <el-form-item label="数据量:">
          <label>0</label>
        </el-form-item>
        <el-form-item label="任务量:">
          <label>0</label>
        </el-form-item>
        <div>
          <el-button type="danger" plain size="medium" @click="logout">注销</el-button>
          <el-button type="info" size="medium">编辑信息</el-button>
          <el-button type="primary" size="medium">更改环境</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "user",
  setup(props, { refs, root }) {
    const store = useStore();
    const router = useRouter();

    let logout = () => {
      store.commit('user/init')
      store.commit('catalog/init')
      router.push('/login')
    }
    
    return{
      logout
    }
  },
};
</script>

<style>
ul li {
  list-style: none;
}
/* body{font-family:"微软雅黑";} */
.info {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin: 10px;
  font-size: initial;
}
.avatar {
  /* display: inline-block; */
}
.head {
  text-align: center;
}
</style>
