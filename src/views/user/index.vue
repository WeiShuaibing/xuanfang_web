<template>
  <div class="app-container">
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" align="center" label="ID" width="150" />
        <el-table-column prop="name" align="center" label="姓名" />
        <el-table-column prop="idcard" align="center" label="认证">
          <template slot-scope="scope">
            <el-image :src="scope.row.idcard | idcardFilter" style="width: 180px" />
          </template>
        </el-table-column>
        <el-table-column prop="status" width="120" align="center" label="认证状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">未通过审核</el-tag>
            <el-tag v-if="scope.row.status === 1" type="success">认证通过</el-tag>
            <el-tag v-if="scope.row.status === 2" type="parimary">审核中</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" width="200" label="注册时间" />
        <el-table-column width="220" label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 2" type="success" size="small" @click="handleTongguo(scope.row.id,1)">审核通过</el-button>
            <el-button v-if="scope.row.status === 0" type="warning" size="small" @click="handleTongguo(scope.row.id, 2)">审核中</el-button>
            <el-button type="danger" size="small" @click="deleteUser(scope.row.id)">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getAllUser, updateStatus, deleteById } from '../../api/user'
export default {
  name: 'UserIndex',
  filters: {
    idcardFilter(val) {
      console.log(val)
      return 'http://localhost:8080/' + val
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.allDate()
  },
  methods: {
    deleteUser(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(id).then(res => {
          this.$message.success('删除成功！')
          this.allDate()
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    handleTongguo(userId, status) {
      updateStatus(userId, status).then(res => {
        this.allDate()
      })
    },
    allDate() {
      getAllUser().then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
