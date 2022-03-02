<template>
  <el-row style="height: 100%">
    <el-col :span="24" class="register-back">
      <el-card class="register">
        <el-form
          ref="registerForm"
          :model="registerFormData"
          :rules="rules"
          status-icon
          label-width="100px"
          size="medium"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              type="text"
              v-model="registerFormData.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerFormData.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="重复密码" prop="checkPass">
            <el-input
              type="password"
              v-model="registerFormData.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerFormData.email"></el-input>
          </el-form-item>

          <el-form-item label="机构" prop="institution">
            <el-input v-model="registerFormData.institution"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="info"
              @click="resetForm(registerForm)"
              size="medium"
              >重置</el-button
            >
            <el-button
              type="primary"
              @click="submit(registerForm)"
              size="medium"
              >注册</el-button
            >
            <el-button type="success" @click="toLoginPage()" size="medium"
              >登录页面</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Register'
}
</script>

<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

import { register } from "@/api/user";

const registerFormData = reactive({
  name: "",
  password: "",
  checkPass: "",
  email: "",
  institution: "",
});
const registerForm = ref();
const router = useRouter();

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (registerFormData.checkPass !== "") {
      if (!registerForm.value) return;
      registerForm.value.validateField("checkPass", () => null);
    }
    callback();
  }
};

const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入重复密码"));
  } else if (value !== registerFormData.password) {
    callback(new Error("重复密码和密码不相同"));
  } else {
    callback();
  }
};

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
  checkPass: [
    {
      required: true,
      message: "请输入重复密码",
      trigger: "blur",
    },
    { validator: validatePass2, trigger: "blur" },
  ],
  email: [
    {
      required: true,
      message: "请输入邮箱",
      trigger: "blur",
    },
    {
      type: "email",
      message: "请输入正确的邮箱",
      trigger: ["blur", "change"],
    },
  ],
  institution: [
    {
      max: 200,
      message: "机构名最长不超过 200 个字符",
      trigger: "blur",
    },
  ],
});

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const toLoginPage = () => {
  router.push("/login");
};

const submit = (formEl) => {
  console.log("register submit: ", formEl);
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      let data = {
        name: registerFormData.name,
        password: registerFormData.password,
        institution: registerFormData.institution,
      };
      register(data)
        .then((response) => {
          console.log("response: ", response);
          ElMessage({
            message: "注册用户成功",
            type: "success",
          });
          toLoginPage();
        })
        .catch((error) => {
          ElMessage({
            message: "注册用户失败: " + error,
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
.register-back {
  background-color: beige;
  height: 100%;
}
.register {
  margin: 10% 35%;
  width: 500px;
  min-width: 400px;
  font-size: 16px;
}
</style>
