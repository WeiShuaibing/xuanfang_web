<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="addFangyuan">新增房源</el-button>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="150" />
        <el-table-column prop="homeNum" label="房间号" />
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="loupan.name" label="楼盘名字" />
        <el-table-column prop="loupan.address" label="楼盘地址" />
        <el-table-column label="户型详情">
          <template slot-scope="scope">
            <span>{{ scope.row.huxing.home }}房{{ scope.row.huxing.keting }}客厅{{ scope.row.huxing.washroom }}卫生间</span>
          </template>
        </el-table-column>
        <el-table-column prop="huxing.remark" label="户型备注" />
        <el-table-column prop="huxing.area" label="户型面积(㎡)" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editInfo(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteInfo(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--添加房源对话款-->
    <div>
      <el-dialog title="新增房源信息" :visible.sync="dialogVisible" width="40%">
        <div>
          <el-form ref="form" :model="fangyuanObj" label-width="80px">
            <el-form-item label="房间号">
              <el-input v-model="fangyuanObj.homeNum" placeholder="请输入房间号" />
            </el-form-item>
            <el-form-item label="楼盘">
              <el-select v-model="fangyuanObj.loupanId" placeholder="请选择楼盘">
                <el-option v-for="item in loupans" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.address }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="户型">
              <el-select v-model="fangyuanObj.huxingId" placeholder="请选择户型">
                <el-option v-for="item in huxings" :key="item.id" :label="item.remark" :value="item.id">
                  <span style="float: left">{{ item.home }}房{{ item.keting }}客厅{{ item.washroom }}卫生间</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.remark }}({{ item.area }}㎡)</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格(万)">
              <el-input-number v-model="fangyuanObj.price" :step="100" :min="10000" />
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="enshureAdd">确 定</el-button>
          <el-button v-if="isEdit" type="primary" @click="enshureEdit">修 改</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { getAll as getAllLoupan } from '@/api/loupan'
import { getAll as getAllHuxing } from '@/api/huxing'
import { getAll as getAllFangyaun, save, deleteById, update } from '../../api/fangyuan'

export default {
  name: 'FangYuanIndex',
  data() {
    return {
      dialogVisible: false,
      isEdit: false,
      loupans: [],
      huxings: [],
      tableData: [],
      fangyuanObj: {
        loupanId: '',
        huxingId: '',
        homeNum: '',
        price: ''
      }
    }
  },
  mounted() {
    this.allHuxing()
    this.allLoupan()
    this.allFangyaun()
  },
  methods: {
    enshureEdit() {
      update(this.fangyuanObj).then(res => {
        this.$message.success('修改成功！')
        this.isEdit = false
        this.dialogVisible = false
        this.allFangyaun()
      })
    },
    editInfo(row) {
      this.isEdit = true
      this.dialogVisible = true
      this.fangyuanObj = row
      console.log(this.fangyuanObj)
    },
    deleteInfo(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(id).then(res => {
          this.$message.success('删除成功！')
          this.allFangyaun()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    enshureAdd() {
      console.log(this.fangyuanObj)
      if (this.fangyuanObj.loupanId === '' || this.fangyuanObj.huxingId === '' || this.fangyuanObj.homeNum === '') {
        this.$message.info('请完善信息！')
        return
      }
      save(this.fangyuanObj).then(res => {
        this.dialogVisible = false
        this.allFangyaun()
      })
    },
    addFangyuan() {
      this.dialogVisible = true
    },
    allFangyaun() {
      getAllFangyaun().then(res => {
        this.tableData = res.data
        console.log(this.tableData)
      })
    },
    allHuxing() {
      getAllHuxing().then(res => {
        this.huxings = res.data
      })
    },
    allLoupan() {
      getAllLoupan().then(res => {
        this.loupans = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
