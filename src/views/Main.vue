<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :default-active="currentHash"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <div v-for="item in powerArr" :key="item.url">
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>

          <el-submenu v-else :index="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="child.url"
                v-for="child in item.children"
                :key="child.url"
                >{{ child.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in breadcrumblist" :key="item">{{
              item
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div>
          {{ uname }}
          <img style="width: 50px; border-radius: 50%" :src="imgUrl" alt="" />
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checkToken, getaccountInfo } from "@/api/apis";
export default {
  data() {
    return {
      uname: "",
      list: [
        {
          url: "/main/index",
          icon: "el-icon-menu",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/main/order",
          icon: "el-icon-document",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "/main/items",
          icon: "el-icon-menu",
          name: "商品管理",
          children: [
            { url: "/main/itemslist", name: "商品列表" },
            { url: "/main/additem", name: "添加商品" },
            { url: "/main/itemstype", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/main/shop",
          icon: "el-icon-menu",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          url: "/main/users",
          icon: "el-icon-menu",
          name: "账号管理",
          children: [
            { url: "/main/userlist", name: "用户列表" },
            { url: "/main/useradd", name: "添加用户" },
            { url: "/main/useredit", name: "修改用户" },
          ],
          roles: ["super"],
        },
        {
          url: "/main/total",
          icon: "el-icon-menu",
          name: "销售统计",
          children: [
            { url: "/main/salecount", name: "商品统计" },
            { url: "/main/ordercount", name: "订单统计" },
          ],
          roles: ["super"],
        }, //动态菜单
      ],
      currentHash: "/main/index",
      imgUrl: "",
      breadcrumblist: [],
    };
  },
  computed: {
    powerArr() {
      // let newArr = this.list.filter((item) => {
      //   return item.roles.includes(localStorage.role)
      // })
      // return newArr
      return this.list.filter((item) => item.roles.includes(localStorage.role));
    },
  },
  methods: {
    refreshInfo() {
      getaccountInfo(localStorage.id).then((res) => {
        this.imgUrl = res.data.accountInfo.imgUrl;
      });
    },
  },
  created() {
    // js windo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           w.location.hash
    // vue this.$route获取当前页面路由
    this.currentHash = this.$route.path;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    // 发送请求验证token是否失效
    checkToken(localStorage.token).then((res) => {
      // console.log(res.data);
      if (res.data.code == 0) {
        this.uname = localStorage.uname;
      } else {
        this.uname = "请登录";
      }
    });

    this.refreshInfo();

    this.$bus.$on("imgEditSuccess", () => {
      this.refreshInfo();
    });

    this.breadcrumblist = this.$route.meta.breadcrumb;
  },
  // 可以观察vue很多属性的变化
  watch: {
    // 监听当前路由的变化
    $route(to) {
      // console.log(to);         
      this.breadcrumblist = to.meta.breadcrumb;
    },
  },
};
</script>

<style lang = "less" scoped>
@baseColor: #545c64;
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}

.el-aside {
  background-color: @baseColor;
}

.el-main {
  background-color: #e9eef3;
}
.el-menu {
  border-right: 0;
}
</style>