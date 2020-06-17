<template>
  <div class="header" style="-webkit-app-region: drag">
    <span class="logo-content">
      <img src="@/assets/image/logo.png" class="logo-icon" />
      <p>鲁班大师</p>
    </span>
    <div class="header-right">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: item.path }" v-for="item in routes" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="personal_outside">
        <span class="el-icon-minus" @click="minimizeWin"></span>
        <span class="el-icon-full-screen" @click="maximizeWin"></span>
        <span class="el-icon-close" @click="closeWin"></span>
      </div>
    </div>
  </div>
</template>
<script>
import { ipcRenderer, shell } from "electron";
export default {
  data() {
    return {
      searchKey: "搜索音乐，视频，歌词，电台",
      arrow: true,
       winFlag:false,
      routes: []
    };
  },
    watch: {
    $route() {
      this.routes = this.$route.matched
    }
  },
   mounted() {
    this.active = this.$route.path
    this.routers = this.$router.options.routes;
  },
  methods: {
    goHome() {
      // location.reload();
      this.$router.push({ path: "/" });
    },
    handleFocus() {
      this.searchKey = "";
    },
    handleBlur() {
      this.searchKey = "搜索音乐，视频，歌词，电台";
    },
    handleClickArrow(arg) {
      if (arg === "left") {
        this.arrow = true;
      } else {
        this.arrow = false;
      }
    },
    minimizeWin() {
      ipcRenderer.send("window-min"); // 通知主进程我要进行窗口最小化操作
    },
    maximizeWin() {
       this.winFlag=!this.winFlag; 
      ipcRenderer.send('window-max',{winFlag:this.winFlag}) //  通知主进程,我要进行窗口最大化、恢复操作，并传入一个Boolean值
    },
    closeWin() {
      ipcRenderer.send("window-close");
    },
    openEx() {
      shell.openExternal("https://www.baidu.com");
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 64px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  background: white;
  color: black;
  box-shadow: 0px 2px 12px 0px rgba(0, 21, 41, 0.12);
  .logo-content {
    height: 64px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: rgba(48, 49, 51, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #e9e9e9;
    box-sizing: border-box;
    width: 200px;
    flex: 0 0 200px;
    .logo-icon {
      width: 45px;
      height: 45px;
      margin-right: 16px;
    }
  }
  .header-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 16px;
  }
  .personal_outside {
    text-align: right;
    color: black;
    display: flex;
    align-items: center;
    .icon-max-size {
      display: inline-block;
      height: 10px;
      width: 12px;
      border-radius: 2px;
      border: 1px solid rgb(177, 172, 172);
    }
    .text_loginstatus,
    .text_VIP {
      font-size: 12px;
      display: inline-block;
      margin-left: 6px;
    }
    .text_VIP {
      margin-left: 10px;
    }
    .el-icon-close {
      font-size: 18px;
    }

    .el-icon-edit-outline,
    .el-icon-minus,
    .el-icon-full-screen,
    .el-icon-close {
      color: black;
      margin-left: 20px;
      cursor: pointer;
    }
    .el-icon-minus:hover,
    .el-icon-full-screen:hover,
    .el-icon-close:hover {
      color: #fe5f23;
    }
  }
}
</style>
