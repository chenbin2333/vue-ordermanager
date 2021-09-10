<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="账号" prop="account">
        <template slot-scope="scope">
          <span v-show="!scope.row.isEdit">{{ scope.row.account }}</span>
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.account"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" prop="ctime">
        <template slot-scope="scope">
          <span v-show="!scope.row.isEdit">{{ scope.row.ctime }}</span>
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.ctime"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="用户组" prop="userGroup">
        <template slot-scope="scope">
          <span v-show="!scope.row.isEdit">{{ scope.row.userGroup }}</span>
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.userGroup"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope)">{{
            scope.row.isEdit ? "完成" : "编辑"
          }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-button @click="deleteselect" type="danger" style="margin-bottom: 10px"
      >批量删除</el-button
    >
    <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
  </div>
</template>

<script>
import { listAdd, deleteuser, deletelist, accountEdit } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 5,
      total: 0,
    };
  },
  created() {
    this.getuserlist();
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleEdit(scope) {
      if (scope.row.isEdit) {
        scope.row.isEdit = false;
        // console.log(scope);
        accountEdit(scope.row.id, scope.row.account, scope.row.userGroup).then(
          (res) => {
            // console.log(res.data);
            if (res.data.code === 0) {
              this.$message({
                message: "恭喜你，账号修改成功!",
                type: "success",
              });
            }
          }
        );
      } else {
        scope.row.isEdit = true;
      }
    },
    handleDelete(scope) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteuser(scope.row.id);
          this.getuserlist();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(newpagesize) {
      this.pagesize = newpagesize;
      this.getuserlist();
    },
    handleCurrentChange(newpage) {
      this.currentPage = newpage;
      this.getuserlist();
    },
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      // console.log(val);
      this.multipleSelection = val.map((item) => item.id);
    },
    deleteselect() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let str = JSON.stringify(this.multipleSelection);
          deletelist(str);
          this.getuserlist();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getuserlist() {
      listAdd(this.currentPage, this.pagesize).then((res) => {
        let arr = res.data.data;
        for (let item of arr) {
          item.ctime = getChinatime(item.ctime);
          item.isEdit = false;
        }
        this.tableData = arr;
        this.total = res.data.total;
      });
    },
  },
};
</script>

<style scoped>
.el-pagination {
  margin-top: 10px;
}
.el-button {
  margin: 20px 4px;
}
</style>