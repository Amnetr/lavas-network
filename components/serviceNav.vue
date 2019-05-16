<template>
  <div class="service-container">
    <div
      v-for="(service,index) in serviceList"
      :ref="'service-' + index"
      @touchstart.stop.prevent="touchStart(index,$event)"
      @touchend.stop.prevent="touchEnd(index,$event)"
    >{{service}}</div>
    <div style="color: #D7D7D7">敬请期待...</div>
    <div style="color: #D7D7D7">敬请期待...</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      serviceList: ['虚拟网关服务', '黑名单服务', '白名单服务',
        '传输加速服务', '视频加速服务', 'IPSecVPN服务', '网站过滤服务'],
      touched: true
    }
  },
  methods: {
    touchStart (index, event) {
      this.$refs['service-' + index][0].style.backgroundColor = '#eeeeee'
    },
    touchEnd (index, event) {
      let pathArray = ['vgws', 'blacklist', 'whitelist',
        'tcp', 'video', 'IPSecVPN服务', '网站过滤服务']
      this.$refs['service-' + index][0].style.backgroundColor = 'white'
      this.$router.push({
        path: '/' + pathArray[index]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.service-container
  width: 100%
  background-color: #eeeeee
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  div
    width: 33%
    background-color: white
    height: 3.5rem
    line-height: 3.5rem
    margin-bottom: 0.15rem
    vertical-align: middle
    text-align: center
    font-size: 0.875rem
    font-weight: 400
  .istouched
    background-color: #eeeeee
  .notouched
    background-color: white
</style>


