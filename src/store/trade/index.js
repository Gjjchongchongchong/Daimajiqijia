import { reqGetUserAddress, reqGetTradeGoodsList, reqPostSubmitTrade } from '@/api'
const state = {
  userAddressList: [],
  orderInfo: {},
  orderId: null
}
const mutations = {
  GETUSERADDRESS (state, userAddressList) {
    state.userAddressList = userAddressList
  },
  GETTRADEGOODSLIST (state, orderInfo) {
    state.orderInfo = orderInfo
  },
  POSTSUBMITTRADE (state, orderId) {
    state.orderId = orderId
  }
}
const actions = {
  // 获取用户信息
  async getUserAddress ({ commit }) {
    let result = await reqGetUserAddress()
    // console.log(result);
    if (result.code == 200) {
      commit('GETUSERADDRESS', result.data)
    }
  },
  // 获取订单信息
  async getTradeGoodsList ({ commit }) {
    let result = await reqGetTradeGoodsList()
    // console.log(result);
    if (result.code == 200) {
      commit('GETTRADEGOODSLIST', result.data)
    }
  },
  // 提交订单
  async postSubmitTrade ({ commit }, { tradeNo, data }) {
    let result = await reqPostSubmitTrade(tradeNo, data)
    console.log(result);
    if (result.code == 200) {
      commit('POSTSUBMITTRADE', result.data)
    } else {
      alert(result.message);
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}