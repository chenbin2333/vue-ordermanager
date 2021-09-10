<template>
  <div>
    <el-table
      :data="tableData"
      v-loading="loading"
      element-loading-text="数据拼命加载中"
      style="height: 380px"
    >
      <el-table-column label="序号" prop="id"> </el-table-column>
      <el-table-column label="分类名称" prop="cateName">
        <template slot-scope="scope">
          <span v-show="!scope.row.isEdit">{{ scope.row.cateName }}</span>
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.cateName"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="是否启用" prop="state">
        <template slot-scope="scope">
          <el-switch
            :disabled="!scope.row.isEdit"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
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
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getItemsType, editItemsType, deleteCate } from "@/api/apis";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 6,
      pagesizes: [6, 12],
      total: 0,
      loading: true,
    };
  },
  created() {
    this.refreshData();
  },
  methods: {
    refreshData() {
      this.loading = true;

      getItemsType(this.currentPage, this.pagesize).then((res) => {
        let newArr = res.data.data;
        for (let obj of newArr) {
          obj.state = obj.state == 1;
          obj.isEdit = false;
        }
        this.tableData = newArr;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    // 当前页数发生改变
    handleCurrentChange(newpage) {
      this.currentPage = newpage;
      this.refreshData();
    },
    // 当前每页显示的页数发生改变
    handleSizeChange(newpagesize) {
      this.pagesize = newpagesize;
      this.refreshData();
    },
    handleEdit(scope) {
      if (scope.row.isEdit) {
        editItemsType(scope.row).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "商品分类编辑成功!",
              type: "success",
            });
          }
        });
        scope.row.isEdit = false;
      } else scope.row.isEdit = true;
    },
    handleDelete(scope) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCate(scope.row).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.refreshData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
</style>