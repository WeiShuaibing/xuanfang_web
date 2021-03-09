<template>
  <div class="app-container">
    <el-row>
      <svg-icon icon-class="myYuyue" style="width: 100%;height: 200px" />
      <h2 style="color: #20a0ff">客户预约：</h2>
    </el-row>
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="user.name" label="预约人" align="center" />
        <el-table-column prop="user.phone" label="预约者电话" align="center" />
        <el-table-column prop="yuyueDate" label="预约时间" align="center">
          <template slot-scope="scope">
            <span>{{ dataFormat(scope.row.yuyueDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="warning" size="small" @click="handleYuyue(scope.row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="margin-top: 60px;">
      <h3 style="color: #20a0ff">客户预约(已处理)：</h3>
      <el-table :data="haveHandleDate" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="user.name" label="预约人" align="center" />
        <el-table-column prop="user.phone" label="预约者电话" align="center" />
        <el-table-column prop="yuyueDate" label="预约时间" align="center">
          <template slot-scope="scope">
            <span>{{ dataFormat(scope.row.yuyueDate) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getYuyuInfoOfAdviser, changeStatus } from '../../api/yuyue'
export default {
  name: 'YuyueIndex',
  data() {
    return {
      tableData: [],
      haveHandleDate: []
    }
  },
  mounted() {
    this.getYuyueInfo(0)
    this.getHaveHandleYuyueInfo()
  },
  methods: {
    handleYuyue(row) {
      changeStatus(row.id, 1).then(res => {
        this.getYuyueInfo(0)
        this.getHaveHandleYuyueInfo()
      })
    },
    getHaveHandleYuyueInfo() {
      getYuyuInfoOfAdviser(1).then(res => {
        this.haveHandleDate = res.data
      })
    },
    getYuyueInfo(status) {
      getYuyuInfoOfAdviser(status).then(res => {
        this.tableData = res.data
      })
    },
    dataFormat(v) {
      if (v != null) {
        var date = new Date(v)
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
      }
    }
  }
}
</script>

<style scoped>

</style>
