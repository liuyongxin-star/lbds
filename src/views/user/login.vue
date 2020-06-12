<template>
  <div class="login">
    <div class="login-header">鲁班大师</div>
    <div class="login-content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号码">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login" @click="loginFn">登录</el-button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer, session } from "electron";
const remote = require("electron").remote;
export default {
  data() {
    return {
      form: {
        phone: "",
        password: "",
      },
    };
  },
  mounted() {
    this.setWidth();
  },
  methods: {
    loginFn() {
      const cookie = {
        url: "http://localhost/",
        name: "token",
        value: "token",
        expirationDate: new Date().getTime() + 30 * 24 * 3600 * 1000,
      };
      remote.session.defaultSession.cookies.set(cookie).then(
        (res) => {
          console.log(res);
          localStorage.setItem("token", "token");
          this.$router.push("/");
        },
        (error) => {
          console.error(error);
        }
      );
    },
    setWidth() {
      ipcRenderer.send("setMainWindow", { width: 400, height: 500 });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  .login-header {
    width: 100%;
    height: 80px;
    font-size: 18px;

    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: black;
    line-height: 28px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-app-region: drag;
  }
  .login-content {
    padding: 30px;
  }
  .login {
    width: 100%;
  }
}
</style>
