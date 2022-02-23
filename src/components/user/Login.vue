<template>
  <el-row style="height: 100%">
    <el-col :span="24" class="login-back">
      <el-card class="login">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          status-icon
          label-width="100px"
          size="medium"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              type="text"
              v-model="ruleForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="机构" prop="institution">
            <el-input v-model="ruleForm.institution"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="info" @click="resetForm(ruleFormRef)" size="medium"
              >重置</el-button
            >
            <el-button @click="toRegisterPage()" type="info" size="medium"
              >注册页面</el-button
            >
            <el-button type="primary" @click="submit(ruleFormRef)" size="medium"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

import { login, getRootCatalog } from "@/plugins/axios/api";

export default {
  name: "login",
  setup(props, { refs, root }) {
    const ruleForm = reactive({
      name: "",
      password: "",
      institution: "",
    });
    const ruleFormRef = ref();
    const router = useRouter();
    const store = useStore();

    /**
     * 表单验证
     */
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (ruleForm.checkPass !== "") {
          if (!ruleFormRef.value) return;
          ruleFormRef.value.validateField("checkPass", () => null);
        }
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
    const toRegisterPage = () => {
      router.push("/register");
    };
    const submit = (formEl) => {
      console.log("login submit: ", formEl);
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          let data = {
            name: ruleForm.name,
            password: ruleForm.password,
          };
          login(data)
            .then((res) => {
              console.log("response: ", res);
              ElMessage({
                message: "登录成功！",
                type: "success",
              });
              store.commit("user/set", res.data);
              store.commit("user/updateIsLogin")
              let catalogId = res.data.catalogId
              if (catalogId) {
                getRootCatalog(catalogId)
                  .then((res) => {
                    ElMessage({
                      message: "获取数据根目录",
                      type: "success",
                    });
                    store.commit("catalog/setCatalog", res.data);
                    store.commit("catalog/setDataList", res.data.children);
                  })
                  .catch((err) => {
                    ElMessage({
                      message: "获取根目录失败： " + err,
                      type: "error",
                    });
                  });
              }
              router.push('/user')
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

    return {
      rules,
      ruleForm,
      ruleFormRef,
      submit,
      resetForm,
      toRegisterPage,
    };
  },
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
