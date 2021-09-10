import Vue from 'vue'
import Router from 'vue-router'
import { checkToken } from './api/apis'

Vue.use(Router)

const router =  new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('./views/Main.vue'),
      children: [
        // 首页
        {
          path: '/main/index',
          name: 'main/index',
          component: () => import('./views/Main/Index.vue'),
          meta: {breadcrumb: ['首页']}
        },
        // -------------------  订单管理 ---------------------------
        {
          path: '/main/order',
          name: '/main/order',
          component: () => import('./views/Main/Order.vue'),
          meta: {breadcrumb: ['订单管理']}
        },
        // ------------------- 商品管理  --------------------------
        {
          path: '/main/itemslist',
          name: '/main/itemslist',
          component: () => import('./views/Main/items/ItemList.vue'),
          meta: {breadcrumb: ['商品管理', '商品列表']}
        },
        {
          path: '/main/additem',
          name: 'main/additem',
          component: () => import('./views/Main/items/AddItem.vue'),
          meta: {breadcrumb: ['商品管理', '添加商品']}
        },
        {
          path: '/main/itemstype',
          name: '/main/itemstype',
          component: () => import('./views/Main/items/ItemsType.vue'),
          meta: {breadcrumb: ['商品管理', '商品分类']}
        },
        // ------------------- 账号管理  -------------------------
        {
          path: '/main/useradd',
          name: '/main/useradd',
          component: () => import('./views/Main/users/UserAdd.vue'),
          meta: {breadcrumb: ['账号管理', '添加账号']}
        },
        {
          path: '/main/useredit',
          name: '/main/useredit',
          component: () => import('./views/Main/users/UserEdit.vue'),
          meta: {breadcrumb: ['账号管理', '修改用户']}
        },
        {
          path: '/main/userlist',
          name: '/main/userlist',
          component: () => import('./views/Main/users/UserList.vue'),
          meta: {breadcrumb: ['账号管理', '用户列表']}
        },
        // ------------------ 销售统计 -----------------------------
        {
          path: '/main/salecount',
          name: '/main/salecount',
          component: () => import('./views/Main/sales/SaleCount.vue'),
          meta: {breadcrumb: ['销售统计', '商品统计']}
        },
        {
          path: '/main/ordercount',
          name: '/main/ordercount',
          component: () => import('./views/Main/sales/OrderCount.vue'),
          meta: {breadcrumb: ['销售统计', '订单统计']}
        },
        // ----------------- 店铺管理  -------------------------------
        {
          path: '/main/shop',
          name: '/main/shop',
          component: () => import('./views/Main/Shop.vue'),
          meta: {breadcrumb: ['店铺管理']}
        }

      ]
    }
    ]
})

router.beforeEach((to, from, next) => {
  // 只要不是默认登录，都开启路由验证
  if (to.path != '/') {
    checkToken(localStorage.token).then(res => {
      if (res.data.code == 0)
        next()
      else
        next('/')
    })
  } else
    next()
})

export default router
