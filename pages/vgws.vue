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
    >创建虚拟网关</el-button>
    <div class="table-container">
      <el-table
        :data="tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase())
        || data.status.toLowerCase().includes(search.toLowerCase())
        || data.area.toLowerCase().includes(search.toLowerCase()))"
        border
        style="width: 100%"
        size="small"
        :header-cell-style="changeHeaderStyle"
        :cell-style="changeCell"
      >
        <el-table-column fixed prop="id" label="ID"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="area" label="可用区"></el-table-column>
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
          label-width="90px"
          class="demo-ruleForm"
          size="mini"
          label-position="left"
        >
          <el-form-item label="网关名称" prop="id" required>
            <el-input v-model="configData.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="计费模式" prop="mode">
            <el-radio-group v-model="configData.mode">
              <el-radio label="按需计费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="区域" prop="vgw">
            <el-radio-group v-model="configData.area">
              <el-radio label="北京一"></el-radio>
              <el-radio label="北京二"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="WAN口网卡" prop="wan">
            <el-select v-model="configData.wan.vpc" placeholder="VPC">
              <el-option label="vpc01" value="vpc01"></el-option>
              <el-option label="vpc02" value="vpc02"></el-option>
              <el-option label="vpc03" value="vpc03"></el-option>
            </el-select>
            <el-select v-model="configData.wan.staticip" placeholder="固定IP">
              <el-option label="106.14.163.101" value="106.14.163.101"></el-option>
            </el-select>
            <el-select v-model="configData.wan.ip" placeholder="弹性公网IP">
              <el-option label="180.76.0.1" value="180.76.0.1"></el-option>
              <el-option label="180.76.0.2" value="180.76.0.2"></el-option>
              <el-option label="180.76.0.3" value="180.76.0.3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="LAN口网卡" prop="lan">
            <el-select v-model="configData.lan.vpc" placeholder="VPC">
              <el-option label="vpc01" value="vpc01"></el-option>
              <el-option label="vpc02" value="vpc02"></el-option>
              <el-option label="vpc03" value="vpc03"></el-option>
            </el-select>
            <el-select v-model="configData.lan.staticip" placeholder="固定IP">
              <el-option label="106.14.163.101" value="106.14.163.101"></el-option>
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
        area: '北京一',
      }, {
        id: '2',
        status: '正常',
        area: '北京一',
      }, {
        id: '3',
        status: '停用',
        area: '北京二',
      }, {
        id: '4',
        status: '正常',
        area: '北京一',
      }],
      search: '',
      showConfig: false,
      configData: {
        id: '',
        mode: '按需计费',
        area: '北京一',
        status: '正常',
        wan: {
          vpc: '',
          staticip: '',
          ip: ''
        },
        lan: {
          vpc: '',
          staticip: ''
        }
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
        mode: '按需计费',
        area: '北京一',
        status: '正常',
        wan: {
          vpc: '',
          staticip: '',
          ip: ''
        },
        lan: {
          vpc: '',
          staticip: ''
        }
      }
      this.$message({
        type: 'success',
        message: '创建成功!'
      });
    },
    stop (row, rowIndex) {
      this.tableData[rowIndex].status = '停用'
      this.$message({
        type: 'success',
        message: '停用成功!'
      })
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
