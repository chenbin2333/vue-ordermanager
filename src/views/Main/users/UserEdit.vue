<template>
  <div>
    <el-card class="box-card" style="height:500px">
      <div slot="header" class="clearfix">
        <span>管理员信息</span>
      </div>
      <el-row>
        <el-col :span="12"
          ><div>管理员ID: {{ id }}</div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="12"
          ><div>账号: {{ uname }}</div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="12"
          ><div>用户组: {{ userGroup }}</div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="12"
          ><div>创建时间: {{ ctime }}</div></el-col
        >
      </el-row>
      <el-row>
        管理员头像:
        <div class="image">
          <el-upload
            class="avatar-uploader"
            :action="USER_IMG_UPLOAD"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :data="uploaddata"
          >
             <img
                v-if="imgUrl"
                style="width: 150px"
                :src="GET_USER_IMG + imgUrl"
                class="avatar"
              />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
         <el-button type="primary" @click="clickBtn">确定</el-button>
      </el-row>
    </el-card>
    
  </div>
</template>

<script>
import { getaccountInfo, USER_IMG_UPLOAD, GET_USER_IMG } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      uploaddata: {},
      id: 0,
      uname: "",
      userGroup: "",
      ctime: "",
      imgUrl: '',
      USER_IMG_UPLOAD: '',
      GET_USER_IMG: ''
    };
  },
  created() {
    this.uploaddata = {id: localStorage.id}
    this.USER_IMG_UPLOAD = USER_IMG_UPLOAD
    this.GET_USER_IMG = GET_USER_IMG
    getaccountInfo(localStorage.id).then((res) => {
      // console.log(res.data);
      this.id = res.data.accountInfo.id;
      this.uname = res.data.accountInfo.account;
      this.userGroup = res.data.accountInfo.userGroup;
      let time = getChinatime(res.data.accountInfo.ctime);
      this.ctime = time;
    });
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.imgUrl = res.imgUrl;
       
      }
    },
    clickBtn() {

      this.$bus.$emit("imgEditSuccess");
        this.$message({
          message: '恭喜你，用户头像上传成功!',
          type: 'success'
        });
      this.imgUrl = ''
    }
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: #fff;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.image {
  display: inline-block;
  width: 170px;
  height: 170px;
  border: 1px #ccc dashed;
  margin-left: 10px;
}
.el-row {
 border-bottom: 1px #ccc dashed;
 line-height: 50px;
  height: 50px;
}
.el-row:last-child {
  border-bottom: 0;
  margin-top: 20px;
}
.el-button {
  margin-left: 40px;
  /* margin-top: 20px; */
}
</style>