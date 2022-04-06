<template>
  <div style="text-align:center">
    <!-- <el-dialog :visible.sync="dialogVisible" append-to-body>
    <img width="100%" :src="dialogImageUrl" alt />
  </el-dialog> -->
  <div class="merge" v-if="imgBig"></div>
<img :src="getPic" v-if="imgBig" class="imgBig" />
    <el-card class="basicInfo" style="width: 40%; height: 80%; margin: 0 auto">
      <div class="picture" v-if="newPic"></div>
      <el-form ref="form" label-width="30%" :label-position="labelPosition">
        <h4 style="font-size: initial; text-align: center; margin-top: 0%">
          个人信息
        </h4>
        <el-divider></el-divider>
        <el-form-item label="头像:">
          <!-- <label v-if="!isChange">{{}}</label> -->
          <img :src="getPic" v-if="!isChange" class="img" @click="showImgBig"/>
          <label v-if="isChange"
            ><el-upload
              class="picture"
              drag
              action="/api/user/picture"
              :data="{id:user.id}"
              :auto-upload="true"
              :file-list="List"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                <em>拖拽/点击</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png 不大于 500kb
                </div>
              </template>
            </el-upload></label
          >
        </el-form-item>
        <el-form-item label="姓名:">
          <label v-if="!isChange">{{ user.name }}</label>
          <label v-if="isChange"
            ><el-input
              class="change"
              v-model="user.name"
              placeholder="Please input"
          /></label>
        </el-form-item>
        <el-form-item label="机构:">
          <label v-if="!isChange">{{ user.institution }}</label>
          <label v-if="isChange"
            ><el-input
              class="change"
              v-model="user.institution"
              placeholder="Please input"
          /></label>
        </el-form-item>
        <el-form-item label="Email:">
          <label v-if="!isChange">{{ user.email }}</label>
          <label v-if="isChange"
            ><el-input
              class="change"
              v-model="user.email"
              placeholder="Please input"
          /></label>
        </el-form-item>
        <el-form-item label="数据量:">
          <label>0</label>
        </el-form-item>
        <el-form-item label="任务量:">
          <label>0</label>
        </el-form-item>
        <div>
          <el-button type="danger" plain size="medium" @click="logout"
            >注销</el-button
          >
          <el-button type="info" size="medium" @click="changePass"
            >更改密码</el-button
          >

          
          <el-button type="primary" size="medium" @click="edit" v-if="!isChange"
            >编辑信息</el-button
          >
          <el-button type="warning" size="medium" @click="edit" v-if="isChange"
            >完成编辑</el-button
          >
        </div>
      </el-form>
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="新密码">
            <el-form :model="loginFormData" :rules="rules">
              <el-form-item
                label="新密码"
                :label-width="formLabelWidth"
                prop="password"
              >
                <el-input
                  v-model="loginFormData.password"
                  autocomplete="off"
                  style="width: 100% !important"
                ></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="commitPass">提交</el-button>
              </span>
            </template>
          </el-dialog>
  </div>
</template>

<script>
export default {
  name: "User",
};
</script>

<script setup>
import { reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { todo } from "@/utils/littleTools";
import service from "@/utils/request";
import { strpscript, validateVPassword } from "@/utils/validate.js";
import { UserFilled } from "@element-plus/icons";
import { UploadFilled } from "@element-plus/icons";

const store = useStore();
const router = useRouter();
let dialogFormVisible = ref(false);
const user = computed(() => {
  return store.getters["user/getUser"];
});
let imgBig=ref(false);

function showImgBig () {
  imgBig.value=true
 
 setTimeout(() => {
   document.addEventListener("click", fooup);
 }, 300);
    

  
};
function fooup() {
      // 取消鼠标监听事件 菜单栏

      imgBig.value = false;
      document.removeEventListener("click", fooup); // 关掉监听，
    }
let newPass = ref("");
let oldUser = {
  name: user.value.name,
  institution: user.value.institution,
  email: user.value.email,
};
const loginFormData = reactive({
  password: "",
});
let newPic = ref(false);
function getFile(file, fileList) {
  this.getBase64(file.raw).then((res) => {
    const params = res.split(",");
    console.log(params, "params");
    if (params.length > 0) {
      this.proofImage = params[1];
    }
  });
}

let isChange = ref(false);
const logout = () => {
  store.commit("user/init");
  store.commit("catalog/init");
  router.push("/login");
};
let validatePassword = (rule, value, callback) => {
  if (value == "") callback(new Error("密码不能为空！"));
  else if (validateVPassword(value)) {
    callback(new Error("密码 6-20位，包含大小写字母和数字"));
  } else callback();
};
const rules = reactive({
  password: [
    {
      validator: validatePassword,
      trigger: "blur",
    },
  ],
});
const edit = () => {
  if (isChange.value) {
    let i = 0;
    if (oldUser.name == user.value.name) {
      i++;
    }
    if (oldUser.institution == user.value.institution) {
      i++;
    }
    if (oldUser.email == user.value.email) {
      i++;
    }
    if (i == 3) {
      isChange.value = !isChange.value;
      return;
    }

    service.post("/user/update", user.value); //数据库更新
    store.commit("user/setUser", user.value); //缓存更新
    oldUser = {
      name: user.value.name,
      institution: user.value.institution,
      email: user.value.email,
    };
    todo("edit");
  }
  isChange.value = !isChange.value;
};
const changePass = () => {
  dialogFormVisible.value = true;

  console.log(1122333);
};

const commitPass = () => {
  if (validateVPassword(loginFormData.password)) {
    return;
  }
  user.value.password = loginFormData.password;
  console.log(user.value.password);
  dialogFormVisible.value = false;
  todo("change password");
  service.post("/user/password", user.value);
};
const getPic=computed(()=>{
  return "/api/user/image/"+user.value.id
})
</script>

<style scoped>
.merge{
  position: fixed;
  left: -20%;
  top: -20%;
  width: 150%;
  height: 150%;
  z-index: 5000;
  background-color: rgba(2, 11, 63, 0.692);
}
.imgBig{
  position: absolute;
  left: 20%;
  top: 20%;
  width: 30vw;
  height: 30vw;
  z-index: 5100;
}
.img {
  width: 50px;
  height: 50px;
  margin-left: -5px;
}
.basicInfo {
  width: 100% !important;
  position: relative;
  left: -10vw;
  padding-left: -50px !important;
}
.el-form-item__label {
  text-align: left !important;
}
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
/* .avatar {
  display: inline-block;
} */
.head {
  text-align: center;
}
::v-deep .change .el-input__inner {
  -webkit-appearance: none;
  background-color: var(--el-input-bg-color, var(--el-color-white));
  background-image: none;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  border: var(--el-input-border, var(--el-border-base));
  box-sizing: border-box;
  color: var(--el-input-text-color, var(--el-text-color-regular));
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: var(--el-transition-border);
  width: 25%;
  min-width: 120px;
  margin-left: 37.5%;
  text-align: center;
}
</style>
