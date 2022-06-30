import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home/Home.vue'
import Search from '@/pages/Search/Search.vue'
import Login from '@/pages/Login/Login.vue'
import Register from '@/pages/Register/Register.vue'
import Detail from '@/pages/Detail/Detail.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/AddCartSuccess.vue'
import ShopCart from '@/pages/ShopCart/ShopCart.vue'
import Trade from '@/pages/Trade/Trade.vue'
import Pay from '@/pages/Pay/Pay.vue'
import PaySuccess from '@/pages/PaySuccess/PaySuccess.vue'
import Center from '@/pages/Center/Center.vue'
import store from '@/store'

// 二级路由组件
import MyOrder from '@/pages/Center/myOrder/myOrder.vue'
import GroupOrder from '@/pages/Center/groupOrder/groupOrder.vue'


Vue.use(VueRouter)

const routes = [
    // 重定向
    {
        path: '/',
        redirect: '/home',
        meta: { show: true }
    },
    {
        path: '/home',
        component: Home,
        meta: { show: true }
    }, {
        path: '/search/:keyword',
        component: Search,
        meta: { show: true },
        name: 'paramsSearch'
    }, {
        path: '/search',
        component: Search,
        meta: { show: true },
        name: 'search'
    }, {
        path: '/login',
        component: Login,
        meta: { show: false }
    }, {
        path: '/detail/:skuid',
        component: Detail,
        name: 'Detail',
        meta: { show: true }
    }, {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        name: 'AddCartSuccess',
        meta: { show: true }
    }, {
        path: '/shopcar',
        component: ShopCart,
        name: 'ShopCart',
        meta: { show: true }
    }, {
        path: '/register',
        component: Register,
        meta: { show: false }
    }, {
        path: '/trade',
        component: Trade,
        meta: { show: false },
        beforeEnter: (to, from, next) => {
            // ...去交易页面，必须从购物车且购物车列表不能为空
            // if (from.path == '/shopcat') {
            //   console.log(from.path);
            next()
                // } else {
                //   // 其他路由组建来，必须回到原路组件
                //   // console.log(store.state.shopcar.shopCarList.length);
                //   next(false)
                // }
        }
    }, {
        path: '/pay',
        component: Pay,
        meta: { show: false }
    }, {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: false }
    }, {
        path: '/center',
        component: Center,
        meta: { show: false },
        children: [{
            path: 'myorder',
            component: MyOrder
        }, {
            path: 'groupOrder',
            component: GroupOrder
        }, {
            path: '/center',
            redirect: '/center/myorder'
        }]

    }
]

const router = new VueRouter({
    routes,
    // 路由切换滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

// 全局路由，路由器前置
router.beforeEach(async(to, from, next) => {
    next()
        // console.log(store);
        // 用户登录了才有token，
    let token = store.state.user.token
        // 用户信息
    let name = store.state.user.userInfo.name
        // 用户已经登录
    if (token) {
        // 用户已经登录不能前往login,跳转至首页 
        if (to.path == '/login') {
            next('/')
        } else {
            // 登陆了去的不是login【home|search|detail|shopcart】
            if (name) {
                next()
            } else {
                // 没有用户信息派发action让仓库存储用户信息再跳转
                try {
                    await store.dispatch('reqAutoLogin')
                    next()
                } catch (error) {
                    // token失效
                    // 清除token
                    await store.dispatch('reqGetLoginOut')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录不能前往支付页面
        if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/paysuccess') != -1 || to.path.indexOf('/center') != -1) {
            // 登录后返回到点击登录的页面
            next('/login?redirect=' + to.path)
        } else {
            next()
        }
    }
})

export default router