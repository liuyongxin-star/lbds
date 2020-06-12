<template>
  <div class="login">
    <div class="login-header">鲁班大师
        <div class="personal_outside">
      <span class="el-icon-minus" @click="minimizeWin"></span>
      <span class="el-icon-close" @click="closeWin"></span>
    </div>
    </div>
    <div class="login-content">
      <el-input
        placeholder="手机号码"
        maxlength="11"
        v-model="form.phone"
        class="input-item"
      >
        <i slot="prefix" class="el-input__icon el-icon-user"></i>
      </el-input>
      <el-input
        type="password"
        placeholder="密码"
        v-model="form.password"
        class="input-item"
      >
        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
      </el-input>
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
    minimizeWin() {
      ipcRenderer.send("window-min"); // 通知主进程我要进行窗口最小化操作
    },
    maximizeWin() {
      ipcRenderer.send("window-max");
    },
    closeWin() {
      ipcRenderer.send("window-close");
    },
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
      ipcRenderer.send("setMainWindow", { width: 400, height: 320 });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  background: white;
  background-image: url("../../assets/image/bg.png");
  background-size: 100% 100%;

  .personal_outside {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;
    span{
        margin: 10px;
        cursor: pointer;
    }
  }
  .login-header {
    width: 100%;
    height: 80px;
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: black;
    line-height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-app-region: drag;
  }
  .login-content {
    padding: 20px 40px;
    .input-item {
      margin-bottom: 30px;
    }
  }
  .login {
    background: #fe5f23;
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    width: 100%;
    border: none;
  }
}
</style>
