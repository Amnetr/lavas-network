<template>
  <div id="mainContainer">
    <div class="goback">
      <!-- <img src="../static/img/goback.png" @click="goback()"> -->
      <i class="el-icon-arrow-left" @click="goback()"></i>
    </div>
    <el-input v-model="search" size="mini" placeholder="输入关键字搜索" class="searchDiv"/>
    <el-button
      id="createBtn"
      type="danger"
      size="mini"
      @click="createList"
      :disabled="showConfig"
    >创建白名单</el-button>
    <div class="table-container">
      <el-table
        :data="tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase())
        || data.status.toLowerCase().includes(search.toLowerCase())
        || data.vgw.toLowerCase().includes(search.toLowerCase()))"
        border
        style="width: 100%"
        size="small"
        :header-cell-style="changeHeaderStyle"
        :cell-style="changeCell"
      >
        <el-table-column fixed prop="id" label="ID"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="vgw" label="虚拟网关"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <span @click="stop(scope.row,scope.$index)" class="operationBtn">停用</span>
            <span @click="deleteRow(scope.row,scope.$index)" class="operationBtn">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="config-container" v-if="showConfig">
      <div id="myForm">
        <el-form
          :model="configData"
          label-width="80px"
          class="demo-ruleForm"
          size="mini"
          label-position="left"
        >
          <el-form-item label="名单名称" prop="id">
            <el-input v-model="configData.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="名单内容" prop="content">
            <el-input type="textarea" v-model="configData.content"></el-input>
          </el-form-item>
          <el-form-item label="虚拟网关" prop="vgw">
            <el-select v-model="configData.vgw" placeholder="请选择虚拟网关">
              <el-option label="vgw01" value="vgw01"></el-option>
              <el-option label="vgw02" value="vgw02"></el-option>
              <el-option label="vgw03" value="vgw03"></el-option>
              <el-option label="vgw04" value="vgw04"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitForm()">提交</el-button>
            <el-button @click="cancelForm()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        id: '1',
        status: '正常',
        vgw: 'vgw01',
      }, {
        id: '2',
        status: '正常',
        vgw: 'vgw02',
      }, {
        id: '3',
        status: '停用',
        vgw: 'vgw01',
      }, {
        id: '4',
        status: '正常',
        vgw: 'vgw03',
      }],
      search: '',
      showConfig: false,
      configData: {
        id: '',
        content: '',
        vgw: '',
        status: '正常'
      }
    }
  },
  methods: {
    goback () {
      this.$router.push({
        path: '/'
      })
    },
    changeHeaderStyle ({ row, column, rowIndex, columnIndex }) {
      return {
        background: '#D7D7D7',
        textAlign: 'center'
      }
    },
    changeCell ({ row, column, rowIndex, columnIndex }) {
      if (row.status === '正常' && columnIndex === 1) {
        return {
          background: 'white',
          color: '#70B603',
          textAlign: 'center'
        }
      } else if (row.status === '停用' && columnIndex === 1) {
        return {
          background: 'white',
          color: '#D9001B',
          textAlign: 'center'
        }
      } else {
        return {
          background: 'white',
          textAlign: 'center'
        }
      }
    },
    createList () {
      this.showConfig = !this.showConfig
    },
    cancelForm () {
      this.showConfig = !this.showConfig
    },
    submitForm () {
      this.tableData.push(this.configData)
      this.showConfig = !this.showConfig
      this.configData = {
        id: '',
        content: '',
        vgw: '',
        status: '正常'
      }
      this.$message({
        type: 'success',
        message: '创建成功!'
      })
    },
    stop (row, rowIndex) {
      this.tableData[rowIndex].status = '停用'
      this.$message({
        type: 'success',
        message: '停用成功!'
      });
    },
    deleteRow (row, rowIndex) {
      this.tableData.splice(rowIndex, 1)
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
#mainContainer
  height: 96%
  width: 95%
  margin: 0 auto
  position: relative
  background-color: #eee
  .searchDiv
    width: 35%
  #createBtn
    float: right
  .goback
    height: 5%
    width: 100%
    padding: 0.6rem 0
    i
      font-size: 2.5rem
  .table-container
    width: 100%
    margin-top: 0.1rem
    .operationBtn
      color: #AAAAAA
      text-decoration: underline
  .config-container
    width: 100%
    margin: 0.5rem 0
    background-color: white
    padding: 1rem 0 0.1rem 0
    border-radius: 4px
    #myForm
      width: 92%
      margin: 0 auto
</style>
