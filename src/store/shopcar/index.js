import { reqShopCarList, reqDeleteGoods, reqChangeCheckedStatus } from '@/api'
// search 小仓库
const state = {
  // 搜索数据存放对象
  shopCarList: []
}
const mutations = {
  GETSHOPLIST (state, shopCarList) {
    state.shopCarList = shopCarList
  }
}
const actions = {
  async reqGetShopCarList ({ commit }) {
    let result = await reqShopCarList()
    // console.log(result);
    if (result.code == 200) {
      commit('GETSHOPLIST', result.data)
    }
  },
  async reqDeleteGoodsList ({ commit }, skuId) {
    // console.log(skuId);
    let result = await reqDeleteGoods(skuId)
    // console.log(result);
    if (result.code == 200) {
      // console.log(result);
    } else {
      console.log('error');
    }
  },
  async reqChangeCheckedStatus ({ commit }, { skuId, isChecked }) {
    return await reqChangeCheckedStatus(skuId, isChecked)
  },
  deleteAllCheckedCartByContext ({ dispatch, getters }) {
    let PromiseAll = []
    // context:小仓库，commit【提交mutations修改state】，getters【计算属性】 dispatch【派发action】 state【当前数据库】
    getters.shopCarList.cartInfoList.forEach(element => {
      let promise = element.isChecked == 1 ? dispatch('reqDeleteGoodsList', element.skuId) : ''
      PromiseAll.push(promise)
    });
    return Promise.all(PromiseAll)
  },
  // 全选状态修改
  updateAllChecked ({ dispatch, state }, isChecked) {
    let promiseAll = []
    state.shopCarList[0].cartInfoList.forEach(element => {
      let promise = dispatch('reqChangeCheckedStatus', { skuId: element.skuId, isChecked })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
// getter 计算属性，在项目中，为了简化数据而生
const getters = {
  shopCarList (state) {
    return state.shopCarList[0] || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}