<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
        <el-button
          @click="clickSave"
          style="float: right; padding: 10px"
          type="primary"
          >保存</el-button
        >
      </div>
      <p><span>店铺名称:</span> <el-input v-model="name"></el-input></p>
      <p>
        <span>店铺公告:</span>
        <el-input v-model="bulletin" type="textarea"></el-input>
      </p>
      <p>
        <span>店铺头像:</span>
        <el-row class="shopimg">
          <el-upload
            class="avatar-uploader"
            :action="SHOP_IMG_UPLOAD"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              style="width: 150px"
              v-if="avatar"
              :src="avatar == '' ? '' : GET_SHOP_IMG + avatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-row>
      </p>
      <p>
        <span>店铺图片:</span>
        <el-upload
          :action="SHOP_IMG_UPLOAD"
          list-type="picture-card"
          :file-list="fileList"
          :on-success="shopimgUploadSuccess"
          :on-remove="remove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog>
          <img width="100%" :src="pics" alt="" />
        </el-dialog>
      </p>
      <p>
        <span>配送费:</span>
        <el-input v-model="deliveryPrice"></el-input>
      </p>
      <p>
        <span> 配送时间:</span>
        <el-input v-model="deliveryTime"></el-input>
      </p>
      <p>
        <span>配送描述:</span>
        <el-input v-model="description"></el-input>
      </p>
      <p>
        <span>店铺评分:</span>
        <el-input v-model="score"></el-input>
      </p>
      <p>
        <span>销量:</span>
        <el-input v-model="sellCount"></el-input>
      </p>
      <p class="activity">
        <span>活动:</span>
        <el-checkbox-group v-model="supports">
          <el-checkbox label="在线支付满28减5"></el-checkbox>
          <el-checkbox label="VC无限果汁全场八折"></el-checkbox>
          <el-checkbox label="单人精彩套餐"></el-checkbox>
          <el-checkbox label="特价饮品八折抢购"></el-checkbox>
          <el-checkbox label="单人特色套餐"></el-checkbox>
        </el-checkbox-group>
      </p>
      <p>
        <span>营业时间:</span>
        <el-time-picker
          is-range
          v-model="date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        >
        </el-time-picker>
      </p>
    </el-card>
  </div>
</template>

<script>
import { getshopinfo, GET_SHOP_IMG, SHOP_IMG_UPLOAD, editshopInfo } from "@/api/apis";
export default {
  data() {
    return {
      id: 0,
      name: "",
      bulletin: "",
      avatar: "",
      deliveryPrice: 0,
      deliveryTime: 0,
      description: "",
      score: 0,
      sellCount: 0,
      supports: [],
      pics: [],
      date: [],
      minPrice: 0,
      GET_SHOP_IMG: "",
      SHOP_IMG_UPLOAD: "",
      fileList: [],
    };
  },
  created() {
    this.GET_SHOP_IMG = GET_SHOP_IMG;
    this.SHOP_IMG_UPLOAD = SHOP_IMG_UPLOAD;
    getshopinfo().then((res) => {
      // console.log(res.data.data);
      for (let item in res.data.data) this[item] = res.data.data[item];

      // console.log(this.pics);

      // 回填照片墙
      this.fileList = this.pics.map((imgstr) => {
        return {
          name: imgstr,
          url: GET_SHOP_IMG + imgstr,
        };
      });
    });
  },
  methods: {
    handleAvatarSuccess(res) {
      this.avatar = res.imgUrl;
    },

    shopimgUploadSuccess(res) {
      // console.log(res.imgUrl);
      this.pics.push(res.imgUrl);
      console.log(this.pics);
    },

    // 移除店铺图片
    remove(res) {
      // console.log(res);
      this.pics.splice(this.pics.indexOf(res.name), 1);
      console.log(this.pics);
    },

    clickSave() {
      let params = {
        id: this.id,
        name: this.name,
        bulletin: this.bulletin,
        avatar: this.avatar,
        deliveryPrice: this.deliveryPrice,
        deliveryTime: this.deliveryTime,
        description: this.description,
        score: this.score,
        sellCount: this.sellCount,
        minPrice: this.minPrice,
        
        supports: JSON.stringify(this.supports),
        pics: JSON.stringify(this.pics),
        date: JSON.stringify([this.date[0], this.date[1]]),
      };
      // console.log(params);
      editshopInfo(params).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
          message: '恭喜你，店铺信息修改成功!',
          type: 'success'
        });
        }
      })
    },
  },
};
</script>

<style scoped>
.shopimg {
  display: inline-block;
  width: 148px;
  height: 148px;
  border: 1px dashed #ccc;
  line-height: 148px;
  text-align: center;
  font-size: 26px;
}
p {
  box-sizing: border-box;
  margin-top: 10px;
  /* height: 40px; */
  /* padding-left: 10px; */
}
p span {
  float: left;
  width: 90px;
  line-height: 42px;
}
.el-input,
.el-textarea {
  width: 400px;
}
.activity {
  box-sizing: border-box;
  height: 60px;
  width: 600px;
}
</style>