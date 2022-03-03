<template>
  <el-row style="height: 100%">
    <el-col :span="24" class="login-back">
      <el-card class="login">
        <el-form
          ref="loginForm"
          :model="loginFormData"
          :rules="rules"
          status-icon
          label-width="100px"
          size="medium"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              type="text"
              v-model="loginFormData.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginFormData.password"
              autocomplete="off"
            ></el-input>
            </el-form-item>
          <el-form-item>
            <el-button type="info" @click="resetForm(loginForm)" size="medium"
              >重置</el-button
            >
            <el-button @click="toRegisterPage()" type="info" size="medium"
              >注册</el-button
            >
            <el-button type="primary" @click="submit(loginForm)" size="medium"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

import { validatePassword } from '@/utils/validate.js'
import { login} from "@/api/user";

const loginFormData = reactive({
  name: "",
  password: "",
});
const loginForm = ref();
const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
    {
      max: 30,
      message: "用户名最长不超过 30 个字符",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    { validator: validatePass, trigger: "blur" },
  ],
  institution: [
    {
      max: 200,
      message: "机构名最长不超过 200 个字符",
      trigger: "blur",
    },
  ],
});
const router = useRouter();
const store = useStore();

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (loginFormData.checkPass !== "") {
      if (!loginForm.value) return;
      loginForm.value.validateField("checkPass", () => null);
    }
    callback();
  }
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const toRegisterPage = () => {
  router.push("/register");
};

// 登录
const submit = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      login(loginFormData)
        .then((res) => {
          ElMessage({
            message: "登录成功！",
            type: "success",
          });
          delete res.data.password
          store.commit("user/setUser", res.data);
          store.commit('catalog/setRoot', res.data.catalogId)
          router.push("/user");
        })
        .catch((err) => {
          ElMessage({
            message: "登录失败： " + err,
            type: "error",
          });
        });
    } else {
      ElMessage("请先通过验证");
      return false;
    }
  });
};
</script>

<style scoped>
.login {
  margin: 12% 35%;
  min-width: 400px;
}
.login-back {
  background-color: beige;
  height: 100%;
}
</style>
