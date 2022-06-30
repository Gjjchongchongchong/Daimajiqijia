import { resGetSearchList } from '@/api'
// search 小仓库
const state = {
  // 搜索数据存放对象
  searchList: {}
}
const mutations = {
  GETSEARCGLIST (state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  async getSearchList ({ commit }, params = {}) {
    // params形参，是当用户派发action的时候，第二个参数传递过来的，至少传递一个空对象
    let result = await resGetSearchList(params)
    // console.log(result);
    if (result.code == 200) {
      // console.log(result.data);
      commit("GETSEARCGLIST", result.data)
    }
  }
}
// getter 计算属性，在项目中，为了简化数据而生
const getters = {
  attrsList (state) {
    // 后面代码防止没网的情况,防止遍历undefinde
    return state.searchList.attrsList || []
  },
  goodsList (state) {
    return state.searchList.goodsList || []
  },
  trademarkList (state) {
    return state.searchList.trademarkList || []
  },
}
export default {
  state,
  mutations,
  actions,
  getters
}