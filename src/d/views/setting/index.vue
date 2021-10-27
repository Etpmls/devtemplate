<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="180px" label-position="left">
      <el-form-item label="清除缓存" prop="clearCache">
        <el-button type="danger" size="mini" @click="open(SettingClearCache)"> 清除 </el-button>
        <div class="el-upload__tip">
          <i class="el-icon-info"> 该操作将删除该系统所有模块的缓存，请谨慎操作。 </i>
        </div>
      </el-form-item>
      <el-form-item label="磁盘清理" prop="diskCleanup">
        <el-button type="warning" size="mini" @click="open(SettingDiskCleanup)"> 清理 </el-button>
        <div class="el-upload__tip">
          <i class="el-icon-info"> 该操作会自动清理磁盘无用文件，以节省服务器空间，删除期间请勿提交新的数据。 </i>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { SettingClearCache, SettingDiskCleanup } from '@/d/api/api'
import { successMessage } from '@/d/utils/utils'
export default {
  components: {},
  props: [],
  data() {
    return {
      form: {
        clearCache: undefined
      },
      rules: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    open(callback) {
      this.$confirm('您确定要继续操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        callback()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
    },
    async SettingClearCache() {
      const { message } = await SettingClearCache()
      successMessage(this, '成功', message)
    },
    async SettingDiskCleanup() {
      const { message } = await SettingDiskCleanup()
      successMessage(this, '成功', message)
    }
  }
}

</script>

<style scoped>
  .app-container {
    padding: 20px;
    margin: 20px 20px ;
    background: #fff;
    border-radius: 2px;
  }
</style>
