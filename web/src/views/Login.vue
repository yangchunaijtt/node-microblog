<template>
  <div class="sign_box">
    <div class="signIn" v-if="status == 1">
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="0px"
        key="login"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="signBtn" type="primary" @click="signIn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <p>默认账户：admin</p><br/>
      <p>默认密码：123qwe</p>
    </div>
    <div class="signUp" v-else>
      <el-form
        :model="regForm"
        :rules="regRules"
        ref="regForm"
        label-width="0px"
        key="register"
      >
        <el-form-item prop="username">
          <el-input
            v-model.trim="regForm.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model.trim="regForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input
            v-model="regForm.nickname"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="signBtn" type="primary" @click="signUp"
            >注册</el-button
          >
        </el-form-item>
      </el-form>

      <span class="signText" @click="toSignIn">返回登录</span>
    </div>
    <div v-loading.fullscreen.lock="loading"></div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      loading: false,
      status: 1,
      loginForm: {
        username: "admin",
        password: "123qwe",
      },
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      regForm: {
        username: "",
        password: "",
        nickname: "",
      },
      regRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
    };
  },
  methods: {
    signIn() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$axios.post("/api/user/login", this.loginForm).then((res) => {
            res = res.data;
            if (res.IsSuccess) {
              this.$store.commit("setUsername", this.loginForm.username);
              Cookie.set("user_name", this.loginForm.username);
              Cookie.set("token", res.data.token);
              this.$store.commit("setToken", res.data.token);
              this.$store.commit("changIsSignIn", 1);
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ name: "home" });
              }, 1500);
            } else {
              this.loading = false;
              this.$message({
                message: res.message,
                center: true,
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    signUp() {
      this.$refs["regForm"].validate((valid) => {
        if (valid) {
          this.$axios.post("/api/user/register", this.regForm).then((res) => {
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toSignUp() {
      this.status = 2;
    },
    toSignIn() {
      this.status = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.sign_box {
  width: 300px;
  margin: 200px auto 0;
  text-align: center;
  .signText {
    color: #3b78dd;
    cursor: pointer;
    &:hover {
      color: #1760d7;
    }
  }
}
.signBtn {
  width: 100%;
  font-size: 18px;
}
</style>