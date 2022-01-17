<template>
  <el-row style="height:100%">
    <el-col :span="24" class="login-back">
        <el-card class="login">
           <el-form :model="ruleForm" status-icon   ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="account">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
            </el-form-item>
        
            <el-form-item>
              <el-button @click="Register" type="info" size='medium'>注册页面</el-button>
              <el-button  type="primary" @click="submitForm()" size='medium'>登录</el-button>
            </el-form-item>
            </el-form>
             
        </el-card>
        
    </el-col>
  </el-row>

</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() { 
      return {
        ruleForm: {
          pwd: '',
          name:'',
          loginUser:''
        },
        
      };
    },
    methods: {
       ...mapMutations(['changeUser']),
      submitForm(){
          var _this=this
          let enCodePwd=_this.ruleForm.pwd
          
         _this.$axios.post('/api/login', 
                  {
                    name:_this.ruleForm.name,
                    pwd:enCodePwd
                  }
              )
             .then((res)=>{
                 if(res.data.code===0){
                     _this.$message({
                        message: 'Success! ',
                        type: 'success'
                    });
                    //获取到当前的登录用户
                     _this.loginUser=res.data.message.account

                                 
                    // 将用户token保存到vuex中
                    _this.changeLogin({ Authorization:res.data.message.token });
                   //将关联用户信息包村到vuex中
                   _this.changerelatedUsr({relatedUsr:res.data.message.relatedUser.oid+','+res.data.message.relatedUser.email})
                   
                   setTimeout(() => {
                        _this.$router.push('/Home')
                    }, 1000);
                    
                 }else{
                     _this.$message({
                        message: 'account or password wrong!',
                        type: 'warning'
                    });

                 }

                
             })
      },
      Register() {
         this.$router.push('/Register')
      }
    }
  }
</script>

<style scoped>
 .login{
     margin:12% 35%; 
     min-width: 400px;  
    
 }
 .login-back{
     background-color:beige;
     height: 100%;
 }
</style>
