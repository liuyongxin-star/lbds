<template>
  <div class="project">
    <div class="project-header">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">本地项目</el-menu-item>
        <el-menu-item index="onLine">线上项目</el-menu-item>
        <el-menu-item index="3">项目模板</el-menu-item>
      </el-menu>
      <div>
        <!-- <el-button type="primary" @click="getLog()">导入本地项目</el-button> -->
        {{ tableData.length }}个项目
        <el-button type="primary" @click="getProject">新建项目</el-button>
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column prop="name" label="项目名称" width="150">
      </el-table-column>
      <el-table-column prop="describe" label="描述（技术栈）" width="150">
      </el-table-column>
      <el-table-column prop="git" label="git地址" width="200">
      </el-table-column>
      <el-table-column prop="filePath" label="本地地址" width="200">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="getLog()" type="text" size="small">克隆</el-button> -->
          <!-- <el-button @click="seeDocument(scope.row)" type="text" size="small"
            >查看文档</el-button
          > -->
          <el-button
            type="text"
            @click="seeDocument(scope.row.document)"
            v-show="scope.row.document"
            size="small"
            >文档</el-button
          >
          <el-button type="text" @click="start(scope.row.filePath)" size="small"
            >编辑器打开</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import { Loading } from "element-ui";

const exec = require("child_process").exec;
const execFile = require("child_process").execFile;
const fs = require("fs");
var timer = null;
export default {
  data() {
    return {
      loading: true,
      activeIndex: "1",
      activeIndex2: "1",
      stop: false,
      project: [],
      project2: [
        {
          name: "PC商城",
          describe: "webpack",
          git: "git@code.aliyun.com:ygp-frontend/ygp-mall-static.git",
          document: "http://static.doc.yigongpin.net:8888/pc-shop-now/",
        },
        {
          name: "后台管理系统",
          describe: "vue",
          git:
            "git@e.coding.net:yigongpin/yigongpin_system/yigongpin_applet.git",
          document: "http://static.doc.yigongpin.net:8888/ygp-oneself-system/",
        },
        {
          name: "后台管理系统",
          describe: "vue",
          git:
            "git@e.coding.net:yigongpin/yigongpin_system/yigongpin_applet.git",
          document: "http://static.doc.yigongpin.net:8888/ygp-oneself-system/",
        },
      ],
      tableData: [],
      defaultUrl: "D:/",
      loadingInstance: null,
    };
  },
  mounted() {
    this.loadingInstance = Loading.service({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    this.init();
    this.getProject();
  },
  methods: {
    init() {
      this.project = [];
    },
    start(file) {
      //启动应用
      const url = localStorage.getItem("save_path");
      execFile(url, [file]);
    },
    filterFn() {
      this.project.forEach((item, index) => {
        this.project2.forEach((value, key) => {
          if (item.git === value.git) {
            this.project[index] = {
              ...this.project[index],
              ...this.project2[key],
            };
            this.project2[key] = this.project[index];
          }
        });
      });
    },
    checkGit(file, url) {
      const res = fs.readFileSync(file, "utf-8");
      const reg = /git.*?\.git/g;
      const git = res.match(reg);
      const address = url.split("/");
      this.project.push({
        name: address[address.length - 1],
        describe: "暂无",
        git: git && git[0],
        filePath: url,
      });
      this.filterFn();
      this.tableData = this.project;
    },
    stopFn() {
      this.stop = true;
    },
    getProject(url = "D:/") {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        this.loadingInstance.close();
      }, 5000);
      var defaultUrl = url;
      fs.readdir(defaultUrl, (err, files) => {
        if (err) {
          console.log(err);
        }
        if (files && files.length != 0) {
          for (var i = 0; i < files.length; i++) {
            var url = defaultUrl + "/" + files[i];
            try {
              var isDirectory = fs.lstatSync(url).isDirectory();
            } catch (error) {
              console.log(error);
            }
            if (files[i] === ".git") {
              this.checkGit(url + "/config", defaultUrl);
              break;
            }
            if (
              files[i] != "node_modules" &&
              files[i] != "dist" &&
              files[i] != "$RREWO3X"
            ) {
              isDirectory && this.getProject(url);
            }
          }
        }
      });
    },
    seeDocument(url) {
      exec(`start ${url}`);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === "onLine") {
        this.tableData = this.project2;
      }
      if (key === "1") {
        this.tableData = this.project;
      }
      if (key === "3") {
        this.tableData = [];
      }
    },
    handleClick(row) {
      console.log(row);
    },
  },
};
</script>
<style lang="scss" scoped>
.project {
  padding: 0 15px;
  width: calc(100% - 30px);
  .project-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
