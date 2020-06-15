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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
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
import { list, create, userDelete } from "@/apis/user";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        phone: "",
      },
      tableData: [],
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    handleDelete(id) {
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const data = {
          id,
        };
        userDelete(data).then((res) => {
          console.log(res);
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getList();
        });
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
</style>
