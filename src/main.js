import Vue from 'vue'

import App from './App.vue'

import router from './router'

import store from './store'

// 三级联动---设置成全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'

// 引入节流器,注册成全局组件
// import _ from 'lodash'
// Vue.use(_)

// 引入mockServer.js
import '@/mock/mockServer'

import 'swiper/css/swiper.min.css'
// Vue.use(Swiper)
// 引入轮播图组件
import Carousel from '@/components/Carousel/Carousel.vue'

// 导入分页器
import Pagination from '@/components/Pagination/Pagination.vue'



// 引入自定义插件
import myPlugins from '@/plugins/myPlugins.js'
Vue.use(myPlugins, {
    name: 'me'
})

// 统一导入全部ajax请求
import * as API from '@/api'

// 引入表单验证插件
import '@/plugins/veevalidate.js'

// 引入elementui组件
import { Button, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false

new Vue({
    router,
    // 全局事件总线$bus配置
    beforeCreate() {
        Vue.prototype.$bus = this
            // 请求挂载在Vue的原型上
        Vue.prototype.$API = API
    },
    store,
    render: h => h(App)
}).$mount('#app')