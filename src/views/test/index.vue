<template>
    <div>
      <h2>测试页面 {{ msg }}</h2>
    </div>
</template>

<script>
import { testInfo } from '@/api/test'
export default {
  name: "TextIndex",
  data() {
    return {
      msg: ''
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      testInfo().then(res => {
        console.log(res)
        this.msg = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
