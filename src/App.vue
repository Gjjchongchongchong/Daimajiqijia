<template>
  <div>
    <Header></Header>
    <router-view>
    </router-view>
    <Footer v-show="$route.meta.show">
    </Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: '',
  components: {
    Header,
    Footer
  },
  mounted () {
    // 通知Vuex发送请求，获取数据，存储到仓库中
    // 派发一个action 获取商品列表的三级列表
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
</style>
