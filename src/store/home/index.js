import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
// home 小仓库
const state = {
  // 分类列表
  categoryList: [],
  // 轮播图数据
  bannerList: [],
  // Floor轮播图数据
  FloorList: []
}
const mutations = {
  CATEGORYLIST (state, categoryList) {
    state.categoryList = categoryList.splice(0, 16)
  },
  BANNERLIST (state, bannerList) {
    state.bannerList = bannerList
  },
  FLOORLIST (state, FloorList) {
    state.FloorList = FloorList
  }
}
const actions = {
  // 通过API里面的接口函数调用，向服务器发送请求，获取服务器数据
  async categoryList ({ commit }) {
    let result = await reqCategoryList()
    // console.log(result);
    if (result.code === 200) {
      commit("CATEGORYLIST", result.data)
    }
  },
  // 获取首页轮播图数据
  async getBannerList ({ commit }) {
    let result = await reqGetBannerList()
    if (result.code === 200) {
      // console.log(result);
      commit('BANNERLIST', result.data)
    }
  },
  // 获取楼层轮播图数据
  async getFloorList ({ commit }) {
    let result = await reqGetFloorList()
    if (result.code === 200) {
      commit('FLOORLIST', result.data)
      // console.log(result.data);
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