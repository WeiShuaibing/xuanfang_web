<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="addFangyuan">新增房源</el-button>
    </el-row>
    <el-row style="margin-top: 10px;" />

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
                <el-option v-for="item in huxings" :key="item.id" :value="item.id">
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
          <el-button type="primary" @click="enshureAdd">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { getAll as getAllLoupan } from '@/api/loupan'
import { getAll as getAllHuxing } from '@/api/huxing'
export default {
  name: 'FangYuanIndex',
  data() {
    return {
      dialogVisible: false,
      loupans: [],
      huxings: [],
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
  },
  methods: {
    enshureAdd() {
      console.log(this.fangyuanObj)
    },
    addFangyuan() {
      this.dialogVisible = true
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
