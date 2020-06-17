<template>
  <div class="user-content">
    <div class="user-header">
      <el-button type="primary" @click="addUserFn">新增用户</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="endTime" label="最后登录时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.endTime || "暂无"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>
            <el-tag :type="scope.row.status == 10 ? 'success' : 'danger'"> {{ scope.row.status | userStatus }}</el-tag>
           </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <span
            v-for="item in fnArr"
            :key="item.label"
            class="btn-item"
            v-show="
              scope.row.status == item.showStatus || item.showStatus === 'all'
            "
          >
            <el-button
              size="mini"
              :type="item.type"
              @click="handleDelete(scope.row.id, item.text, item.fn)"
              >{{ item.label }}</el-button
            >
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="form.phone"
            maxlength="11"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div>密码为手机号码</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, create, userDelete, stop, start } from "@/apis/user";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        phone: "",
      },
      fnArr: [
        {
          label: "启用",
          text: "是否启动该用户？",
          fn: start,
          showStatus: 20,
          type: "primary",
        },
        {
          label: "停用",
          text: "是否停用该用户？",
          fn: stop,
          type: "warning",
          showStatus: 10,
        },
        {
          label: "删除",
          text: "是否删除该用户？删除之后将无法恢复！",
          fn: userDelete,
          showStatus: "all",
          type: "danger",
        },
      ],
      tableData: [],
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    handleDelete(id, text, methods) {
      this.$confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const data = {
          id,
        };
        methods(data).then((res) => {
          console.log(res);
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.getList();
        });
      }).catch(() => {
                 
        });
    },
    createFn() {
      const data = {
        ...this.form,
        password: this.form.phone,
      };
      create(data).then((res) => {
        this.$message({
          message: "新增成功",
          type: "success",
        });
        this.dialogFormVisible = false;
        this.getList();
      });
    },
    addUserFn() {
      this.dialogFormVisible = true;
    },
    getList() {
      list().then((res) => {
        this.tableData = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.user-content {
  padding: 20px;
  .user-header {
    text-align: right;
  }
}
.btn-item {
  margin-right: 10px;
}
</style>
