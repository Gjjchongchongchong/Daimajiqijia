<template>
  <div>
    <!-- 我是首页 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Reconmend></Reconmend>
    <Rank></Rank>
    <Like></Like>
    <!-- :list 通过父向子传值，让floor页面能获取到floorData -->
    <Floor v-for="(FloorData,index) in FloorList" :key="FloorData.id"
      :FloorData='FloorData'>
    </Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/ListContainer.vue'
import Reconmend from '@/pages/Home/Recommend/Recommend.vue'
import Rank from '@/pages/Home/Rank/Rank.vue'
import Like from '@/pages/Home/Like/Like.vue'
import Floor from '@/pages/Home/Floor/Floor.vue'
import Brand from '@/pages/Home/Brand/Brand.vue'
import { mapState } from 'vuex'
export default {
  name: '',
  components: {
    ListContainer,
    Reconmend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted () {
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      FloorList: state => state.home.FloorList
    })
  }
}
</script>

<style>
</style>
