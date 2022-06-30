import { getRegisterQRCode, userRegister, userLogin, reqAutoLogin, reqGetLoginOut } from '@/api'
import { setToken } from '@/utils/token.js'
const state = {
  QRCode: '',
  token: '',
  userInfo: {}
}
const mutations = {
  GETREGISTERQRCODE (state, QRCode) {
    state.QRCode = QRCode
  },
  USERLOGIN (state, token) {
    state.token = token
  },
  GETUSERINFO (state, userInfo) {
    state.userInfo = userInfo
  },
  GETLOGINOUT (state) {
    state.token = ''
    state.userInfo = {}
  }
}
const actions = {
  // 获取二维码
  async RegisterQRCode ({ commit }, phone) {
    // console.log(1);
    let result = await getRegisterQRCode(phone)
    // console.log(result);
    if (result.code == 200) {
      commit('GETREGISTERQRCODE', result.data)
      console.log(result);
    } else {
      alert(error)
    }
  },
  // 注册用户
  async postUserRegister ({ commit }, userData) {
    let result = await userRegister(userData)
    console.log(result);
    if (result, code == 200) {
      return true
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户登录
  async postUserLogin ({ commit }, userdata) {
    let result = await userLogin(userdata)
    // console.log(result);
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token)
      // 持久化存储token
      // console.log(result.data.token);
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async reqAutoLogin ({ commit }) {
    let result = await reqAutoLogin()
    // console.log(result);
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('getUserInfoFaile'))
    }
  },
  // 退出登录
  async reqGetLoginOut ({ commit }) {
    let result = await reqGetLoginOut()
    // console.log(result);
    if (result.code == 200) {
      commit('GETLOGINOUT')
      localStorage.removeItem('TOKEN')
      return 'ok'
    } else {
      return Promise.reject(new Error('reqGetLoginOutFaile'))
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