<template>
  <div class="app-container">
    <el-row style="margin-bottom: 15px;">
      <el-button type="primary" @click="addNewAdviser">添加</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="150" />
      <el-table-column prop="home" label="房间" />
      <el-table-column prop="keting" label="客厅" />
      <el-table-column prop="washroom" label="卫生间" />
      <el-table-column prop="area" label="面积" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editInfo(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteInfo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加对话框-->
    <el-dialog title="添加户型信息" :visible.sync="dialogVisible" width="50%">
      <el-form :model="huxingObj" label-width="100px" class="demo-ruleForm">
        <el-form-item label="房间数" prop="pass">
          <el-input-number v-model="huxingObj.home" :min="1" :max="10" />
        </el-form-item>
        <el-form-item label="客厅数" prop="checkPass">
          <el-input-number v-model="huxingObj.keting" :min="1" :max="10" />
        </el-form-item>
        <el-form-item label="卫生间数" prop="checkPass">
          <el-input-number v-model="huxingObj.washroom" :min="1" :max="10" />
        </el-form-item>
        <el-form-item label="面积" prop="checkPass">
          <el-input-number v-model="huxingObj.area" :min="50" :max="300" />
        </el-form-item>
        <el-form-item label="备注" prop="age">
          <el-input v-model.number="huxingObj.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!isEdit" type="primary" @click="enshureAdd">确 定</el-button>
        <el-button v-if="isEdit" type="success" @click="enshureUpdate">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { savHuxing, getAll, deleteById, updateHuxing } from '@/api/huxing'
export default {
  name: 'HuxingIndex',
  data() {
    return {
      isEdit: false,
      tableData: [],
      dialogVisible: false,
      huxingObj: {
        home: '',
        keting: '',
        area: '',
        washroom: '',
        remark: ''
      }
    }
  },
  mounted() {
    this.getAllInfo()
  },
  methods: {
    enshureAdd() {
      if (this.huxingObj.home === '' || this.huxingObj.keting === '' || this.huxingObj.washroom === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      savHuxing(this.huxingObj).then(res => {
        this.$message.success('添加成功！')
        this.dialogVisible = false
        this.huxingObj.home = ''
        this.huxingObj.keting = ''
        this.huxingObj.washroom = ''
        this.huxingObj.area = ''
        this.huxingObj.remark = ''

        this.getAllInfo()
        this.isEdit = false
      })
    },
    enshureUpdate() {
      if (this.huxingObj.home === '' || this.huxingObj.keting === '' ||
        this.huxingObj.washroom === '' || this.huxingObj.area === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      updateHuxing(this.huxingObj).then(res => {
        this.$message.success('修改成功！')
        this.dialogVisible = false
        this.huxingObj.home = ''
        this.huxingObj.keting = ''
        this.huxingObj.washroom = ''
        this.huxingObj.area = ''
        this.huxingObj.remark = ''
        this.getAllInfo()
        this.isEdit = false
      })
    },
    getAllInfo() {
      getAll().then(res => {
        this.tableData = res.data
      })
    },
    addNewAdviser() {
      this.dialogVisible = true
    },
    editInfo(row) {
      this.isEdit = true
      this.dialogVisible = true
      this.huxingObj = row
    },
    deleteInfo(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(id).then(res => {
          this.$message.success('删除成功！')
          this.getAllInfo()
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    }
  }
}
</script>

<style scoped>

</style>
