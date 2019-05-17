<template>
  <div id="mainContainer">
    <div class="goback">
      <!-- <img src="../static/img/goback.png" @click="goback()"> -->
      <i class="el-icon-arrow-left" @click="goback()"></i>
    </div>
    <el-input v-model="searchRule" size="mini" placeholder="输入关键字搜索" class="searchDiv"/>
    <el-button
      id="createBtn"
      type="danger"
      size="mini"
      @click="createRules"
      :disabled="showRules || showPlans"
    >创建加速规则</el-button>
    <div class="table-container" id="table1">
      <el-table
        :data="rulesData.filter(data => !searchRule || data.id.toLowerCase().includes(searchRule.toLowerCase())
        || data.status.toLowerCase().includes(searchRule.toLowerCase())
        || data.plan.toLowerCase().includes(searchRule.toLowerCase()))"
        border
        style="width: 100%"
        size="small"
        :header-cell-style="changeHeaderStyle"
        :cell-style="changeCell"
      >
        <el-table-column fixed prop="id" label="ID"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="plan" label="策略ID"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- <span @click="stop(scope.row,scope.$index)" class="operationBtn">停用</span> -->
            <span @click="deleteRule(scope.row,scope.$index)" class="operationBtn">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 以下为策略表格 -->
    <el-input v-model="searchPlan" size="mini" placeholder="输入关键字搜索" class="searchDiv"/>
    <el-button
      id="createBtn"
      type="danger"
      size="mini"
      @click="createPlan"
      :disabled="showPlans || showRules"
    >创建加速策略</el-button>
    <div class="table-container">
      <el-table
        :data="plansData.filter(data => !searchPlan || data.id.toLowerCase().includes(searchPlan.toLowerCase())
        || data.status.toLowerCase().includes(searchPlan.toLowerCase())
        || data.vgw.toLowerCase().includes(searchPlan.toLowerCase()))"
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
            <span @click="deletePlan(scope.row,scope.$index)" class="operationBtn">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 以下为配置界面 -->
    <div class="config-container" v-if="showRules">
      <div id="myForm">
        <el-form
          :model="ruleConfig"
          label-width="80px"
          class="demo-ruleForm"
          size="mini"
          label-position="left"
        >
          <el-form-item label="规则名称" prop="id">
            <el-input v-model="ruleConfig.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="规则内容" prop="content">
            <el-input
              type="textarea"
              v-model="ruleConfig.content"
              placeholder="Enhanced,1.1.1.1/23:88,1.1.1.1/24:88; Highspeed,1.1.1.1/25:88,1.1.1.1/26:88;"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitRule()">提交</el-button>
            <el-button @click="cancelRule()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="config-container" v-if="showPlans">
      <div id="myForm">
        <el-form
          :model="planConfig"
          label-width="80px"
          class="demo-ruleForm"
          size="mini"
          label-position="left"
        >
          <el-form-item label="策略名称" prop="id">
            <el-input v-model="planConfig.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="加速规则" prop="rule">
            <el-select v-model="planConfig.rule" placeholder="请选择">
              <el-option v-for="rule in rulesData" :key="rule.id" :label="rule.id" :value="rule.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="虚拟网关" prop="vgw">
            <el-select v-model="ruleConfig.vgw" placeholder="请选择">
              <el-option label="vgw01" value="vgw01"></el-option>
              <el-option label="vgw02" value="vgw02"></el-option>
              <el-option label="vgw03" value="vgw03"></el-option>
              <el-option label="vgw04" value="vgw04"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计费模式" prop="mode">
            <el-radio-group v-model="planConfig.mode">
              <el-radio label="按需计费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitPlan()">提交</el-button>
            <el-button @click="cancelPlan()">取消</el-button>
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
      rulesData: [
        {
          id: '1',
          status: '已绑定',
          plan: '1',
        }, {
          id: '2',
          status: '已绑定',
          plan: '2',
        }, {
          id: '3',
          status: '已绑定',
          plan: '3',
        }, {
          id: '4',
          status: '已绑定',
          plan: '4',
        }
      ],
      plansData: [
        {
          id: '1',
          status: '正常',
          vgw: 'vgw01',
          rule: '1'
        }, {
          id: '2',
          status: '正常',
          vgw: 'vgw02',
          rule: '2'
        }, {
          id: '3',
          status: '停用',
          vgw: 'vgw2',
          rule: '3'
        }, {
          id: '4',
          status: '正常',
          vgw: 'vgw03',
          rule: '4'
        }
      ],
      searchRule: '',
      searchPlan: '',
      showRules: false,
      showPlans: false,
      ruleConfig: {
        id: '',
        content: '',
        status: '未绑定',
        plan: ''
      },
      planConfig: {
        id: '',
        rule: '',
        status: '正常',
        vgw: '',
        mode: '按需计费'
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
      if ((row.status === '正常' || row.status === '已绑定') && columnIndex === 1) {
        return {
          background: 'white',
          color: '#70B603',
          textAlign: 'center'
        }
      } else if ((row.status === '停用' || row.status === '未绑定') && columnIndex === 1) {
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
    createRules () {
      this.showRules = !this.showRules
    },
    createPlan () {
      this.showPlans = !this.showPlans
    },
    cancelRule () {
      this.showRules = !this.showRules
    },
    submitRule () {
      this.rulesData.push(this.ruleConfig)
      this.showRules = !this.showRules
      this.ruleConfig = {
        id: '',
        content: '',
        status: '正常',
        plan: ''
      }
      this.$message({
        type: 'success',
        message: '创建成功!'
      })
    },
    cancelPlan () {
      this.showPlans = !this.showPlans
    },
    submitPlan () {
      this.plansData.push(this.planConfig)
      for (let i in this.rulesData) {
        if (this.rulesData[i].id === this.planConfig.rule) {
          this.rulesData[i].plan = this.planConfig.id
          this.rulesData[i].status = '已绑定'
        }
      }
      this.showPlans = !this.showPlans
      this.planConfig = {
        id: '',
        rule: '',
        status: '正常',
        vgw: '',
        mode: '按需计费'
      }
      this.$message({
        type: 'success',
        message: '创建成功!'
      })
    },
    stop (row, rowIndex) {
      this.plansData[rowIndex].status = '停用'
      this.$message({
        type: 'success',
        message: '停用成功!'
      });
    },
    deleteRule (row, rowIndex) {
      this.rulesData.splice(rowIndex, 1)
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    },
    deletePlan (row, rowIndex) {
      this.plansData.splice(rowIndex, 1)
      for (let i in this.rulesData) {
        if (this.rulesData[i].id === row.rule) {
          this.rulesData[i].plan = ''
          this.rulesData[i].status = '未绑定'
        }
      }
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
  #table1
    margin-bottom: 0.5rem
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
