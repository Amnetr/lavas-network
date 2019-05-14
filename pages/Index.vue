<template>
  <div class="main-container">
    <div class="user-info"></div>
    <div class="swipper-container">
      <swipper></swipper>
    </div>
    <div class="nav-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>
    <div class="chart-container"></div>
  </div>
</template>

<script>
import swipper from '@/components/swipper.vue'
export default {
  name: 'index',
  data () {
    return {
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
  width: 100%
.user-info
  width: 100%
  height: 5%
  margin-bottom: 0.5rem
  background-color: blue
.swipper-container
  width: 100%
  margin-bottom: 0.5rem
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
