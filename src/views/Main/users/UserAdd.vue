<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账号</span>
      </div>
      <div class="text item">
        <p>
          账号:
          <el-input placeholder="请输入账号" v-model="acc" clearable>
          </el-input>
        </p>
        <p>
          密码:
          <el-input
            placeholder="请输入密码"
            v-model="pwd"
            show-password
          ></el-input>
        </p>
        <p>
          用户组
          <el-select v-model="usergroup" slot="prepend" placeholder="请选择用户组">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </p>
        <p>
          <el-button type="primary" @click="clickAdd">添加</el-button>
          <el-button>重置</el-button>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import {userAdd} from '@/api/apis'
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      options: [{
        label: '超级管理员',
        value: '超级管理员'
      },
      {
        label: '普通管理员',
        value: '普通管理员'
      }],
      usergroup: ''
    };
  },                  
  methods: {
    clickAdd() {
      let {acc, pwd, usergroup} = this
      userAdd(acc, pwd, usergroup).then(res => {
        if (res.data.code == 0) {
          this.$message({
          message: '恭喜你，账号添加成功!',
          type: 'success'
        });
        } else {
          this.$message.error('错了哦，账号添加失败!');
        }
      })
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
p {
  margin-bottom: 15px;
  text-align: center;
}
.el-input {
  width: 300px;
  margin-left: 20px;
}
.el-select {
  width: 300px;
  margin-left: 10px;
}
</style>