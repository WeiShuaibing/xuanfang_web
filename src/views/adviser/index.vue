<template>
  <div class="app-container">
    <el-row style="margin-bottom: 15px;">
      <el-button type="primary" @click="addNewAdviser">添加</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" width="200" />
      <el-table-column prop="phone" label="电话" width="180" />
      <el-table-column prop="introduce" label="个人介绍">
        <template slot-scope="scope">
          <div v-html="scope.row.introduce" />
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="250" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editInfo(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteInfo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加用户对话框-->
    <el-dialog title="添加顾问" :visible.sync="dialogVisible" width="60%">
      <el-form :model="adviserObj" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="pass">
          <el-input v-model="adviserObj.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" prop="checkPass">
          <el-input v-model="adviserObj.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" prop="age">
          <el-input v-model.number="adviserObj.remark" type="textarea" />
        </el-form-item>
        <el-form-item label="详细介绍" prop="age">
          <tinymce v-model="adviserObj.introduce" :height="300" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!isEdit" type="primary" @click="enshureAddAdviser">确 定</el-button>
        <el-button v-if="isEdit" type="success" @click="enshureUpdateAdviser">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { saveAdviser, getAll, deleteById, updateAdviser } from '@/api/adviser'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'AdviserIndex',
  components: { Tinymce },
  data() {
    return {
      isEdit: false,
      tableData: [],
      dialogVisible: false,
      adviserObj: {
        name: '',
        phone: '',
        password: '',
        remark: '',
        introduce: ''
      }
    }
  },
  mounted() {
    this.getAllAdviser()
  },
  methods: {
    enshureAddAdviser() {
      this.adviserObj.password = this.adviserObj.phone
      if (this.adviserObj.name === '' || this.adviserObj.phone === '' || this.adviserObj.remark === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      saveAdviser(this.adviserObj).then(res => {
        this.$message.success('添加成功！')
        this.dialogVisible = false
        this.adviserObj.name = ''
        this.adviserObj.phone = ''
        this.adviserObj.remark = ''
        this.adviserObj.introduce = ''

        this.getAllAdviser()
        this.isEdit = false
      })
    },
    enshureUpdateAdviser() {
      if (this.adviserObj.name === '' || this.adviserObj.phone === '' || this.adviserObj.remark === '' || this.adviserObj.introduce === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      updateAdviser(this.adviserObj).then(res => {
        this.$message.success('修改成功！')
        this.dialogVisible = false
        this.adviserObj.name = ''
        this.adviserObj.phone = ''
        this.adviserObj.remark = ''
        this.adviserObj.introduce = ''
        this.getAllAdviser()
        this.isEdit = false
      })
    },
    getAllAdviser() {
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
      this.adviserObj = row
    },
    deleteInfo(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(id).then(res => {
          this.$message.success('删除成功！')
          this.getAllAdviser()
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
