<template>
  <md-card>
    <md-card-media>
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide class="swipper-img"></swiper-slide>
        <swiper-slide class="swipper-img"></swiper-slide>
        <swiper-slide class="swipper-img"></swiper-slide>
        <swiper-slide class="swipper-img"></swiper-slide>
        <swiper-slide class="swipper-img"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </md-card-media>
  </md-card>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="stylus" scoped>
.swipper-img
  background-image: url('../static/img/timg.png')
  height: 8rem
</style>
