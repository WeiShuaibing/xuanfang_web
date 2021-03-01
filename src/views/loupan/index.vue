<template>
  <div class="app-container">
    <el-row style="margin-bottom: 15px;">
      <el-button type="primary" @click="addNewAdviser">添加</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="150" />
      <el-table-column prop="name" label="楼盘名称" />
      <el-table-column prop="address" label="楼盘位置" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="toSeeDescribeInfo(scope.row)">详情</el-button>
          <el-button type="primary" size="small" @click="editInfo(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteInfo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加对话框-->
    <el-dialog title="楼盘详细信息" :visible.sync="describeDialogVisible" :close="describeClose" width="80%">
      <div style="padding: 20px;" v-html="currentLoupan.description" />
    </el-dialog>
    <el-dialog title="添加楼盘" :visible.sync="dialogVisible" width="80%">
      <el-form :model="loupanObj" label-width="100px" class="demo-ruleForm">
        <el-form-item label="楼盘名称" prop="pass">
          <el-input v-model="loupanObj.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="楼盘位置" prop="checkPass">
          <el-input v-model="loupanObj.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" prop="age">
          <el-input v-model.number="loupanObj.remark" type="textarea" />
        </el-form-item>
        <el-form-item label="详细介绍" prop="age">
          <tinymce v-model="loupanObj.description" :height="300" />
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
import { saveLoupan, getAll, deleteById, updateLoupan } from '@/api/loupan'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'LoupanIndex',
  components: { Tinymce },
  data() {
    return {
      isEdit: false,
      tableData: [],
      dialogVisible: false,
      describeDialogVisible: false,
      loupanObj: {
        name: '',
        address: '',
        remark: '',
        description: ''
      },
      currentLoupan: {}
    }
  },
  mounted() {
    this.getAllLoupan()
  },
  methods: {
    describeClose() {
      this.currentLoupan = {}
    },
    toSeeDescribeInfo(row) {
      this.describeDialogVisible = true
      this.currentLoupan = row
    },
    enshureAdd() {
      if (this.loupanObj.name === '' || this.loupanObj.address === '' || this.loupanObj.description === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      saveLoupan(this.loupanObj).then(res => {
        this.$message.success('添加成功！')
        this.dialogVisible = false
        this.loupanObj.name = ''
        this.loupanObj.address = ''
        this.loupanObj.description = ''
        this.loupanObj.remark = ''

        this.getAllLoupan()
        this.isEdit = false
      })
    },
    enshureUpdate() {
      if (this.loupanObj.name === '' || this.loupanObj.address === '' || this.loupanObj.remark === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      updateLoupan(this.loupanObj).then(res => {
        this.$message.success('修改成功！')
        this.dialogVisible = false
        this.loupanObj.name = ''
        this.loupanObj.address = ''
        this.loupanObj.description = ''
        this.loupanObj.remark = ''
        this.getAllLoupan()
        this.isEdit = false
      })
    },
    getAllLoupan() {
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
      this.loupanObj = row
    },
    deleteInfo(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(id).then(res => {
          this.$message.success('删除成功！')
          this.getAllLoupan()
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
