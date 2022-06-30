import { reqGetGoodsList, reqPostShopCar } from '@/api/'
// 封装游客身份模块，生成一个随机字符串（不能改变）
import { getUUID } from '@/utils/uuid_token'

const state = {
    goodsDetailList: {},
    // 临时游客身份证
    uuid_token: getUUID()
}

const mutations = {
    GETGOODSLIST(state, goodsDetailList) {
        state.goodsDetailList = goodsDetailList
    }
}

const actions = {
    // 获取详情页面数据
    async reqGetGoodsList({ commit }, params = {}) {
        let result = await reqGetGoodsList(params)
            // console.log(result.data);
        if (result.code == 200) {
            commit('GETGOODSLIST', result.data)
        }
    },
    // 发送post 请求，跳转到购物车列表
    async PostShopCar({ commit }, { skuid, skuNum }) {
        // console.log(skuid, skuNum);
        let result = await reqPostShopCar(skuid, skuNum)
        return result
    }
}

const getters = {
    categoryView(state) {
        return state.goodsDetailList.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsDetailList.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodsDetailList.spuSaleAttrList || []
    },
    valuesSkuJson(state) {
        return state.goodsDetailList.valuesSkuJson || []
    }
}


export default {
    state,
    mutations,
    getters,
    actions
}