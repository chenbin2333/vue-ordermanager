import axios from 'axios'

// 服务器ip
const IP = 'http://127.0.0.1:5000'

// 请求基本路径
axios.defaults.baseURL = IP

// 商品图片上传接口地址
export const ITEMS_IMG_UPLOAD = IP + '/goods/goods_img_upload'

// 获取商品图片地址

export const GET_ITEMS_IMG = IP + '/upload/imgs/goods_img/'

// 用户头像上传接口地址
export const USER_IMG_UPLOAD = IP + '/users/avatar_upload'

// 获得用户头像地址
export const GET_USER_IMG = IP + '/upload/imgs/acc_img/'

// 获得店铺头像地址
export const GET_SHOP_IMG = IP + '/upload/shop/'

// 店铺头像上传接口
export const SHOP_IMG_UPLOAD = IP + '/shop/upload'

// 登录api
// account: 账号
// password: 密码
// export function login(account, password) {
//   return axios.post('/users/checkLogin', {
//     account, password
//   })
// }

// es6
export let login = (account, password) => axios.post('/users/checkLogin', { account, password })

export let userAdd = (account, password, userGroup) => axios.post('/users/add', { account, password, userGroup })

// export xxx 多次暴露                  接： import {name, login} from 'xxx'
// export default 默认暴露，只能暴露一次 接： import xxx from 'xxx'

// 验证token
export let checkToken = (token) => axios.get('/users/checktoken', { params: { token } })

// 获取账号列表
export let listAdd = (currentPage, pageSize) => axios.get('/users/list', { params: { currentPage, pageSize } })


// 删除用户接口
export let deleteuser = (id) => axios.get('/users/del', {
  params: {
    id
  }
})
// 批量删除账号接口
export let deletelist = (ids) => axios.get('/users/batchdel', { params: { ids } })

// 修改账号接口
export let accountEdit = (id, account, userGroup) => axios.post('/users/edit', { id, account, userGroup })


// 9. 获取账号（个人中心）信息
export let getaccountInfo = (id) => axios.get('/users/accountinfo', {
  params: { id }
})

// ----------------------------------- 订单管理 --------------------------------------

export let getOrderList = (params) => axios.get('/order/list', {params})

// 修改订单接口
export let editOrder = (params) => axios.post('/order/edit', params)

// ----------------------------------- 商品管理 --------------------------------------
// 获取商品分类接口
export let getItemsType = (currentPage, pageSize) => axios.get('/goods/catelist', {
  params: {
    currentPage, pageSize
  }
})

// 修改分类接口
export let editItemsType = (params) => axios.post('/goods/editcate', params)

// 删除分类接口
export let deleteCate = (params) => axios.get('/goods/delcate', { params })

// 添加商品接口
export let addGoods = (params) => axios.post('/goods/add', params)

// 查询所有分类名称
export let getGoodsCate = () => axios.get('/goods/categories')

// 获取商品列表接口
export let goodsItemList = (currentPage, pageSize) => axios.get('/goods/list', {
  params: {
    currentPage,
    pageSize
  }
})
// 删除商品接口
export let deleteGoodsItem = (params) => axios.get('/goods/del', {params})

// 修改商品接口
export let editGoodsItem = (params) => axios.post('/goods/edit', params)


// ----------------------------- 首页报表接口 -------------------------------

export let totaldata = () => axios.get('/order/totaldata')


export let ordertotal = (date) => axios.get('/order/ordertotal', {params: {date}})


// --------------------------- 店铺管理模块 ------------------------------------
export let getshopinfo = () => axios.get('/shop/info')

// 店铺内容修改
export let editshopInfo = (params) => axios.post('/shop/edit', params)