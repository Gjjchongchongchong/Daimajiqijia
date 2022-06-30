<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel,index) in list"
        :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    // 监听bannerList的数据变化,当想数据库发送请求获取到数据后bannerList[]变化
    list: {
      // 立即监听一次
      immediate: true,
      handler () {
        // nextTick:在下次DOM更新，循环结束后 执行延迟回调，在修改数据之后立即使用方法，获取更新后的DOM
        this.$nextTick(() => {
          //  当执行这个回调时，保证服务器数据回来了，v-for执行完毕
          var floor2Swiper = new Swiper(this.$refs.floor1Swiper, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          })
        })
      }
    }
  },
  mounted () {
    // console.log(this.list);
  },
}
</script>

<style lang="less" scoped>
</style>