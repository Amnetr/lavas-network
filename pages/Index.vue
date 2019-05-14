<template>
  <div class="main-container">
    <div class="user-info">
      <span>欢迎，xxx</span>
      <span style="position: absolute;right: 0;text-decoration: underline">注销</span>
    </div>
    <div class="swipper-container">
      <swipper></swipper>
    </div>
    <div class="source-container">
      <div class="source-title">
        <span>我的资源</span>
        <span>[北京一]</span>
      </div>
      <div class="my-source" v-for="source in sourceList">
        <span>{{source.name}}</span>
        <span>{{source.value}}</span>
      </div>
    </div>
    <div class="nav-container"></div>
    <div class="chart-container"></div>
  </div>
</template>

<script>
import swipper from '@/components/swipper.vue'
export default {
  name: 'index',
  data () {
    return {
      sourceList: [
        {
          name: '账户余额',
          value: '1923.00'
        }, {
          name: '弹性云服务器',
          value: '2'
        }, {
          name: '弹性公网IP',
          value: '5'
        }, {
          name: '虚拟私有云VPC',
          value: '1'
        }, {
          name: '云硬盘',
          value: '0'
        }, {
          name: '云硬盘备份',
          value: '0'
        }, {
          name: '云数据库RDS',
          value: '1'
        }
      ]
    }
  },
  methods: {
  },
  components: {
    swipper
  }
}
</script>

<style lang="stylus">
.main-container
  height: 96%
  width: 95%
  margin: 0 auto
  background-color: #eee
.user-info
  width: 100%
  height: 4%
  display: flex
  align-items: center
  color: grey
.swipper-container
  width: 100%
  margin: 0.5rem auto
  margin-top: 0.2rem
.source-container
  width: 100%
  margin-bottom: 0.5rem
  display: flex
  justify-content: space-between
  background-color: white
  padding: 0.5rem 0
  flex-wrap: wrap
  .source-title
    height: 2rem
    width: 100%
    line-height: 2rem
    span:nth-child(1)
      font-size: 1rem
      font-weight: bold
      margin-left: 0.5rem
    span:nth-child(2)
      font-size: 0.8rem
      color: #7F7F7F
  .my-source
    width: 45%
    background-color: #eeeeee
    height: 2rem
    line-height: 2rem
    margin: 0.2rem 0.5rem
    font-size: 0.8rem
    position: relative
    span:nth-child(1)
      margin: 0 0.4rem
    span:nth-child(2)
      position: absolute
      right: 0
      margin-right: 0.4rem
.nav-container
  width: 100%
  height: 40%
  background-color: green
  margin-bottom: 0.5rem
.chart-container
  width: 100%
  background-color: yellow
  height: 30%
.bg-purple
  background: #eee
.grid-content
  border-radius: 4px
  min-height: 36px
</style>
