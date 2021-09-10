<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品添加</span>
      </div>
      <!-- 商品名称 -->
      <el-row>
        <el-col :span="12">
          <span>商品名称</span>
          <el-input v-model="name" placeholder="商品名称"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <!-- 商品分类 -->
        <el-col :span="8">
          <span>商品分类</span>
          <el-select v-model="catevalue" placeholder="请选择">
            <el-option
              v-for="item in options"
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
            v-model="num"
            :min="1"
            :max="10"
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
              <img v-if="imageUrl" style="width:150px" :src="GET_ITEMS_IMG + imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <!-- 商品描述 -->
      <el-row>
        <el-col>
          <span>商品描述</span>
          <el-input type="textarea" v-model="gooddesc"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addItem">添加商品</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getGoodsCate, ITEMS_IMG_UPLOAD, GET_ITEMS_IMG, addGoods } from "@/api/apis";
export default {
  data() {
    return {
      name: "",
      catevalue: "",
      options: [],
      num: 0,
      gooddesc: "",
      imageUrl: '', //新的图片地址
      ITEMS_IMG_UPLOAD: '', //上传图片接口地址
      GET_ITEMS_IMG: '' //获得商品图片地址
    };
  },
  created() {
    getGoodsCate().then((res) => {
      this.options = res.data.categories;
    });
    this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD;
    this.GET_ITEMS_IMG = GET_ITEMS_IMG;
  },
  methods: {
    handleAvatarSuccess(res) {
      // console.log(res);
      this.imageUrl = res.imgUrl;
    },
    addItem() {
      addGoods({
        name: this.name,
       category: this.catevalue,
       price:this.num,
       imgUrl: this.imageUrl,
       goodsDesc: this.gooddesc
      }).then(res => {
        if (res.data.code == 0) {
          this.$message({
          message: '恭喜你,商品添加成功!,请到商品列表查看',
          type: 'success'
        });
        }
      })
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row .el-col {
  padding-left: 20px;
}
.el-row .el-col span {
  margin-right: 30px;
}
.el-input,
.el-textarea {
  width: 300px;
}
.el-textarea {
  position: relative;
  top: 10px;
}
.el-button {
  margin-left: 90px;
  margin-top: 10px;
}
.img {
  display: inline-block;
  width: 150px;
  height: 150px;
  line-height: 150px;
  font-size: 20px;
  border: 1px #ccc dashed;
  text-align: center;
}
</style>