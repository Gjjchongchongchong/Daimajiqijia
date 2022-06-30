// API统一管理
import requests from './request'
import mockRequests from './mockRequest'

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = () => {
  // 发请求
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}

// 获取banner （home首页轮播图接口）
export const reqGetBannerList = () => {
  return mockRequests.get('/banner')
}

// 获取 Floor （Floor轮播图接口）
export const reqGetFloorList = () => {
  return mockRequests.get('/floor')
}

// 获取搜索模块数据
export const resGetSearchList = (params) => {
  // 发送请求并返回数据 
  // post 用 data  get 用 params
  return requests.post('/list', params)
}

// 获取详情页面数据
export const reqGetGoodsList = (skuId) => {
  return requests.get(`/item/${skuId}`)
}

// 将产品添加到购物车中
export const reqPostShopCar = (skuid, skuNum) => {
  // console.log(skuid, skuNum);
  return requests.post(`/cart/addToCart/${skuid}/${skuNum}`)
}

// 获取购物车数据
export const reqShopCarList = () => {
  return requests.get(`/cart/cartList`)
}

// 删除商品
export const reqDeleteGoods = (skuId) => {
  // console.log(skuId);
  return requests.delete(`/cart/deleteCart/${skuId}`)
}

// 切换选中状态
export const reqChangeCheckedStatus = (skuID, isChecked) => {
  return requests.get(`/cart/checkCart/${skuID}/${isChecked}`)
}

// 获取验证码
export const getRegisterQRCode = (phone) => {
  return requests.get(`/user/passport/sendCode/${phone}`)
}

// 用户注册
export const userRegister = (userdata) => {
  return requests.post(`/user/passport/register`, userdata)
}

// 用户登录
export const userLogin = (data) => {
  return requests.post(`/user/passport/login`, data)
}

// 自动登录
export const reqAutoLogin = () => {
  return requests.get(`/user/passport/auth/getUserInfo`)
}

// 退出登录
export const reqGetLoginOut = () => {
  return requests.get(`/user/passport/logout`)
}

// 获取用户地址
export const reqGetUserAddress = () => {
  return requests.get(`user/userAddress/auth/findUserAddressList`)
}

// 获取商品清单
export const reqGetTradeGoodsList = () => {
  return requests.get('/order/auth/trade')
}

// 提交订单
export const reqPostSubmitTrade = (tradeNo, data) => {
  return requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)
}

// 获取支付订单信息
export const reqGetCreateNative = (orderId) => {
  return requests.get(`/payment/weixin/createNative/${orderId}`)
}

// 获取订单支付状态
export const reqPayStatus = (orderId) => {
  return requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
}

// 获取我的订单
export const reqGetMyorder = (page, limit) => {
  return requests.get(`/order/auth/${page}/${limit}`)
}