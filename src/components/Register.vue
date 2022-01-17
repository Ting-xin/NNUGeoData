<template>
  <el-row style="height: 100%">
    <el-col :span="24" class="register-back">
      <el-card class="register">
        <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="rules"
          status-icon
          label-width="100px"
          size="medium"
        >
          <el-form-item label="用户名" prop="account">
            <el-input
              type="text"
              v-model="registerForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="registerForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="重复密码" prop="checkPassword">
            <el-input
              type="password"
              v-model="registerForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerForm.email"></el-input>
          </el-form-item>

          <el-form-item label="机构" prop="institution">
            <el-input v-model="registerForm.institution"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="info" @click="resetForm('ruleForm')" size="medium"
              >重置错误信息</el-button
            >
            <el-button
              type="primary"
              @click="submit('registerForm')"
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
import { ref, defineComponent, reactive, unref} from "vue";
import { useRouter } from "vue-router";

import { register } from '@/plugins/axios/api'

import {
  validate30Length,
  validateEmail,
  validatePassword,
} from "@/utils/validate";

export default {
  name: "register",
  setup(props, { refs, root }) {
    // 表单绑定数据
    const registerForm = reactive({
      name: "",
      password: "",
      checkPass: "",
      email: "",
      institution: "",
    });
    const router = useRouter();

    /**
     * 表单验证
     */
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      if (validate30Length(value)) {
        callback(new Error("用户名不能超过 30 个字符"));
      } else {
        callback();
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      if (validateEmail(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    let checkPassword = (rule, value, callback) => {
      console.log(strpscript(value));
      if (!value) {
        callback(new Error("密码不能为空"));
      }
      if (validatePassword(value)) {
        callback(new Error("密码为 6-20位，包含大小写字母和数字"));
      } else {
        callback();
      }
    };
    let checkPassword2 = (rule, vlaue, callback) => {
      if (this.registerForm.password != this.registerForm.checkPass) {
        callback(new Error("密码与重复密码不相同"));
      } else {
        callback();
      }
    };
    let checkInstitution = (rule, value, callback) => {
      if (value.length > 50) {
        callback(new Error("机构名不能超过 50 个字符"));
      } else {
        callback();
      }
    };
    const rules = reactive({
      name: [{ validator: checkName, trigger: "blur" }],
      password: [{ validator: checkPassword, trigger: "blur" }],
      checkPass: [{ validator: checkPassword2, trigger: "blur" }],
      email: [{ validator: checkEmail, trigger: "blur" }],
      institution: [{ validator: checkInstitution, trigger: "blur" }],
    });

    const resetForm = formName => {
      refs(formName).resetFields();
    };
    const toLoginPage = () => {
      router.push("/login");
    };
    const submit = () => {
      console.log("register");
      let requestData = {
        name: registerForm.name,
        password: registerForm.password,
        institution: registerForm.institution
      };
      console.log(requestData);
      register(requestData)
        .then(response => {
          toLoginPage()
        })
        .catch(error => {
        });
    };

    return {
      registerForm,
      rules,
      submit,
      resetForm,
      toLoginPage,
    };
  },
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
