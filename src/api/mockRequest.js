// 对于axios进行二次封装
import axios from 'axios'
// nprogress 进度条
import Nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 1.利用 axios 对象的方法create ，创建一个axios 实例
const requests = axios.create({
  // 配置对象
  // 基础路径，发送请求的时候，路径中会出现api
  baseURL: '/mock',
  // 代表请求超时的时间5s
  timeout: 5000
});

// 请求拦截器：在请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  Nprogress.start()
  // config 配置对象，对象里面的一个属性很重要 header 请求头
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  Nprogress.done()
  // 成功的回调函数：服务器相应数据回来后，响应拦截器可以检测到，可以做一些事情
  return res.data
}, (error) => {
  // 响应失败的回调函数
  return Promise.reject(new Error('faile'))
})

export default requests;