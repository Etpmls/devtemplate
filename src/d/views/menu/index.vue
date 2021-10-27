<template>
  <div class="app-container">
    <el-scrollbar>
      <el-row>
        <el-alert
          title="警告"
          type="warning"
          description="请谨慎配置本页面！第一次配置前请先向相关人员请教，配置错误将会导致后台无法打开！"
          show-icon
        />
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="left-panel">
            <el-button class="top-element" icon="el-icon-plus" type="primary" size="small" @click="handleSave">
              保存
            </el-button>
            <el-button class="top-element" icon="el-icon-delete" type="danger" size="small" @click="handleReset">
              重置
            </el-button>
          </div>
        </el-col>
      </el-row>
      <json-editor ref="JsonEditor" :value="jsonData" />
    </el-scrollbar>
  </div>
</template>

<script>
import { MenuCreate, MenuGet } from '@/d/api/api'
import { successMessage } from '@/d/utils/utils'
import JsonEditor from '../../components/JsonEditor'
export default {
  name: 'App',
  components: { JsonEditor },
  data: function() {
    return {
      jsonData: {}
    }
  },
  created() {
    this.MenuGet()
  },
  methods: {
    async MenuGet() {
      const res = await MenuGet()
      this.jsonData = res.data
    },
    async handleSave() {
      const textData = this.$refs['JsonEditor'].getValue()
      const { message } = await MenuCreate({ menu: textData })
      successMessage(this, this.lang('success'), message)
      this.MenuGet()
    },
    handleReset() {
      this.MenuGet()
    }
  }
}
</script>

<style>
  .left-panel {
    float: left;
    margin: 10px;
  }
  .top-element {
    margin: 5px !important;
  }
</style>

<style scoped>
  .app-container {
    padding: 20px;
    margin: 20px 20px ;
    background: #fff;
    border-radius: 2px;
  }
</style>
