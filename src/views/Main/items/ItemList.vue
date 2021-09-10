<template>
  <div>
    <el-table :data="list">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <p>
              <el-form-item label="商品ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
            </p>
            <p>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
            </p>
            <p>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
            </p>
            <p>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
            </p>
            <p>
              <el-form-item label="商品图片">
                <img
                  style="width: 50px"
                  :src="GET_ITEMS_IMG + props.row.imgUrl"
                  alt=""
                />
              </el-form-item>
            </p>
            <p>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </p>
            <p>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
            </p>
            <p>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
            </p>
            <p>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
            </p>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img
            style="width: 100px"
            :src="GET_ITEMS_IMG + scope.row.imgUrl"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="warning" @click="clickEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" @click="clickDelete(scope)">删除</el-button>
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

    <el-dialog title="编辑商品数据" :visible.sync="dialogVisible" width="30%">
      <el-row>
        <el-col :span="12">
          <span>商品名称</span>
          <el-input v-model="editData.name" placeholder="商品名称"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <!-- 商品分类 -->
        <el-col :span="8">
          <span>商品分类</span>
          <el-select v-model="editData.category" placeholder="请选择">
            <el-option
              v-for="item in selectOptions"
              :key="item.cateName"
              :label="item.cateName"
              :value="item.cateName"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 商品价格 -->
      <el-row>
        <el-col>
          <span>商品价格</span>
          <el-input-number
            v-model="editData.price"
            label="描述文字"
          ></el-input-number>
        </el-col>
      </el-row>
      <!-- 商品图片 -->
      <el-row>
        <el-col>
          <span>商品图片</span>
          <div class="img">
            <el-upload
              class="avatar-uploader"
              :action="ITEMS_IMG_UPLOAD"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img
                v-if="editData.imgUrl"
                style="width: 150px"
                :src="GET_ITEMS_IMG + editData.imgUrl"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <!-- 商品描述 -->
      <el-row>
        <el-col>
          <span>商品描述</span>
          <el-input type="textarea" v-model="editData.goodsDesc"></el-input>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickItemChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  goodsItemList,
  GET_ITEMS_IMG,
  deleteGoodsItem,
  getGoodsCate,
  ITEMS_IMG_UPLOAD,
  editGoodsItem,
} from "@/api/apis";
export default {
  data() {
    return {
      list: [],
      GET_ITEMS_IMG: "",
      ITEMS_IMG_UPLOAD: "",
      currentPage: 1,
      pagesize: 5,
      pagesizes: [5, 10, 15],
      total: 0,
      dialogVisible: false,
      // 回填数据
      editData: {},
      selectOptions: [],
    };
  },
  created() {
    this.GET_ITEMS_IMG = GET_ITEMS_IMG;
    this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD;
    this.refreshInfo();

    getGoodsCate().then((res) => {
      // console.log(res.data.categories);
      this.selectOptions = res.data.categories;
    });
  },
  methods: {
    refreshInfo() {
      goodsItemList(this.currentPage, this.pagesize).then((res) => {
        this.list = res.data.data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(newpages) {
      this.currentPage = newpages;
      this.refreshInfo();
    },
    handleSizeChange(newpagesize) {
      this.pagesize = newpagesize;
      this.refreshInfo();
    },
    clickDelete(scope) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteGoodsItem(scope.row).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.refreshInfo();
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
    // 点击编辑按钮
    clickEdit(row) {
      this.dialogVisible = true;
      // console.log(row);
      // 对象深拷贝
      // this.editData = JSON.parse(JSON.stringify(row)) 
      // console.log(row);
      this.editData = { ...row };
    },
    // 图片上传成功
    handleAvatarSuccess(res) {
      // console.log(res);
      this.editData.imgUrl = res.imgUrl;
    },
    clickItemChange() {
      editGoodsItem(this.editData).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，商品信息修改成功!",
            type: "success",
          });
          this.dialogVisible = false
          this.refreshInfo()
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.el-form {
  display: flex;
  flex-wrap: wrap;
  p {
    flex: 50%;
  }
}
</style>