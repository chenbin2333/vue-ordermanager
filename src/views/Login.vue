<template>
  <div class="login-box">
    <div class="center-box">
      <h1>{{ name }}</h1>
      <el-input placeholder="请输入内容" v-model="acc" clearable> </el-input>
      <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
      <el-button type="primary" style="width: 100%" @click="clickLogin"
        >登录</el-button
      >
      <p class="error">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/apis";
export default {
  data() {
    return {
      acc: "", //账号
      pwd: "", //密码
      name: "外卖后台管理系统",
      errorMsg: "",
    };
  },
  methods: {
    clickLogin() {
      // console.log(this.acc, this.pwd);
      login(this.acc, this.pwd).then((res) => {
        // console.log(res.data);
        if (res.data.code == 0) {
          // 存储token
          localStorage.token = res.data.token

          // 存储用户组
          localStorage.role = res.data.role

          // 存储用户名
          localStorage.uname = this.acc

          // 存储用户id
          localStorage.id = res.data.id

          this.$router.push("/main/index");

          this.$message({
            message: "恭喜你，登录成功!",
            type: "success",
          });
        } else {
          this.errorMsg = "登录失败,用户名或密码错误!";
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.login-box {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
  .center-box {
    position: relative;
    width: 300px;
    height: 180px;
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    .el-input {
      margin-bottom: 10px;
    }
    h1 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -40px;
      color: #fff;
      font-size: 20px;
    }
    .error {
      color: brown;
    }
  }
}
</style>