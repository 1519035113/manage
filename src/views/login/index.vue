<template>
  <div class="box">
    <div class="login">
      <div class="logo">
        <img src="../../assets/logo.png" alt />
      </div>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <!-- <i class="icons el-icon-user-solid"></i> -->
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" style="width:410px;"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- <i class="icons el-icon-lock"></i> -->
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock" style="width:410px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在3到8个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
            let res =await this.$axios.post('login',this.loginForm)
            console.log(res)
            if(res.status == 200 ){
              this.$message.success(res.data.meta.msg)
              localStorage.setItem('token',res.data.data.token) 
              this.$router.push('/home')
            }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 810px;
  background: #2b4b6b;
  position: relative;
}
.login {
  width: 450px;
  height: 304px;
  border-radius: 3px;
  background: #fff;
  position: absolute;
  box-shadow: 0 0 8px #ddd;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.logo {
  width: 150px;
  height: 150px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 8px #ddd;
  overflow: hidden;
  padding: 10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.el-form {
  width: 100%;
  height: 180px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .icons {
    position: absolute;
    left: 10px;
    top: 13px;
    z-index: 4;
    color: #999;
    
  }
}
</style>
