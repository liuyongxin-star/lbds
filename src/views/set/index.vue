<template>
  <div class="home">
    <div class="content">
      <div style="width: 100%; position: relative; height: 50px;">
        <input
          type="file"
          name="file3"
          id="file3"
          @change="save_func"
          v-show="false"
          webkitdirectory
        />
        <el-input
          style="width: 65%;float: left;"
          placeholder="请选择编辑器"
          v-model="save_path"
          :disabled="true"
        ></el-input>
        <el-button type="primary" @click="click_save_input" style="width:28%"
          >选择编辑器</el-button
        >
      </div>
      <el-button type="primary" @click="clearFn" style="width:28%"
        >清除缓存</el-button
      >
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import storage from "@/utils/datastore";
const exec = require("child_process").exec;
const execFile = require("child_process").execFile;
const process = require("process");
const remote = require("electron").remote;
export default {
  data() {
    return {
      save_path: null,
    };
  },
  components: {},
  mounted() {
    this.save_path = localStorage.getItem("save_path");
    this.setWidth();
  },
  methods: {
     clearFn() {
     storage.set("token", "").write(); 
     this.$router.push("/login")
    },
    setWidth() {
      ipcRenderer.send("setMainWindow", { width: 1122, height: 670 });
    },
    
   
    click_save_input() {
      document.getElementById("file3").click();
    },
    save_func(event) {
      //选择图片保存地址
      if (event.target.files.length > 0) {
        this.save_path = event.target.files[0].path;
        localStorage.setItem("save_path", this.save_path);
      }
    },
    pushFn() {
      process.chdir(this.save_path);
      exec("git add .");
      exec("git commit -m '测试'");
    },
    start() {
      //启动应用
      console.log("fun() start");
      execFile("D:/软件/Microsoft VS Code/Code.exe", [this.save_path], function(
        err,
        data
      ) {
        console.log(err);
        console.log(data.toString());
      });
    },
    createFn() {
      process.chdir(this.save_path);
      exec("git init");
      exec(
        "git remote add -f origin https://github.com/liuyongxin-star/git_demo.git"
      );
      exec("git config core.sparsecheckout true");
      exec("echo test* >> .git/info/sparse-checkout");

      // exec("git remote add -f origin https://github.com/liuyongxin-star/git_demo.git")
      // exec("git config core.sparsecheckout true");
      // exec("echo 'test' >> .git/info/sparse-checkout");
      // exec("git pull origin master ");

      // exec(
      //   `git clone  git@github.com:liuyongxin-star/git_demo.git`,
      //   null,
      //   function(error, stdout, stderr) {
      //     if (error !== null) {
      //       console.log("克隆失败");
      //     } else {
      //       console.log("克隆完成");
      //     }
      //   }
      // );
    },
  },
};
</script>
<style lang="scss">
.home {
  .content {
    width: 50%;
  }
}
</style>
