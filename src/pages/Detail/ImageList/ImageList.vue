<template>
  <div class="swiper-container" ref="currentSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(swiper,index) in zoomImage"
        :key="index">
        <img :src="swiper.imgUrl" :class="{active:currentIndex == index}"
          @click="changeCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  data () {
    return {
      currentIndex: 0
    }
  },
  name: "ImageList",
  props: ['zoomImage'],
  methods: {
    // 轮播图响应式选中
    changeCurrentIndex (index) {
      this.currentIndex = index
      // 通知兄弟组件改变放大图
      this.$bus.$emit('getIndex', this.currentIndex)
    }
  },
  watch: {
    // 监听数据，可以保证数据完成加载，但不能保证v-for遍历完成
    zoomImage (newValue, oldValue) {
      this.$nextTick(() => {
        new Swiper(this.$refs.currentSwiper, {


          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          slidesPerView: 3,
          slidesPreGroup: 3
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>