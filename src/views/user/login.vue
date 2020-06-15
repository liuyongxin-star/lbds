<template>
  <div class="login">
    <div class="login-header">
      鲁班大师
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
      <el-button type="primary" class="login-btn" @click="loginFn"
        >登录</el-button
      >
      <!-- <div class="login-footer">
        <span>注册账户</span>
        <span>忘记密码</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import { ipcRenderer, session } from "electron";
import storage from "@/utils/datastore";
import { login } from "@/apis/user";
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
    console.log("回来了---------")
     ipcRenderer.send("setMainWindow", { width: 400, height: 820 });
  },
  methods: {
    minimizeWin() {
      ipcRenderer.send("window-min");
    },
    maximizeWin() {
      ipcRenderer.send("window-max");
    },
    closeWin() {
      ipcRenderer.send("window-close");
    },
    loginFn() {
      login(this.form).then((res) => {
        this.$message({
          message: "登录成功",
          type: "success",
        });
        setTimeout(() => {
          storage.set("token", res.data.token).write();
          this.$router.push("/");
        }, 1500);
      });
    },

    setWidth() {
      ipcRenderer.send("setMainWindow", { width: 400, height: 820 });
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
    span {
      margin: 10px;
      cursor: pointer;
    }
  }
  .login-header {
    width: 100%;
    height: 70px;
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
      margin-bottom: 20px;
    }
  }
  .login-btn {
    background: #fe5f23;
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    width: 100%;
    border: none;
    margin-top: 15px;
  }
  .login-footer {
    display: flex;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(96, 98, 102, 1);
    line-height: 14px;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    span {
      cursor: pointer;
    }
    span:hover {
      color: #fe5f23;
    }
  }
}
</style>
