<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      title="时间线"
      :before-close="handleClose"
      v-on="$listeners"
      @close="onClose"
    >

      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="跟进方式" prop="method">
          <el-select v-model="formData.method" placeholder="请选择跟进方式" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in methodOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="跟进内容" prop="content">
          <el-input
            v-model="formData.content"
            type="textarea"
            placeholder="请输入跟进内容"
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float:right" @click="handelConfirm">确定</el-button>
        </el-form-item>
      </el-form>
      <el-divider />

      <el-timeline>
        <el-timeline-item v-for="(item, index) in CustomerActivity" :key="index" :timestamp="$moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')" placement="top">
          <el-card>
            <h4>{{ item.method }}</h4>
            <p>{{ item.content }}</p>
            <el-button type="text" @click="handleEdit(item)">修改</el-button>
            <el-button type="text" @click="handleDelete(item)">
              删除
            </el-button>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <el-dialog
        width="30%"
        title="修改"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form ref="CustomerActivityEdit" :model="formDataEdit" :rules="rules" size="medium" label-width="100px">
          <el-form-item label="跟进方式" prop="method">
            <el-select v-model="formDataEdit.method" placeholder="请选择跟进方式" clearable :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in methodOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="跟进内容" prop="content">
            <el-input
              v-model="formDataEdit.content"
              type="textarea"
              placeholder="请输入跟进内容"
              :autosize="{minRows: 4, maxRows: 4}"
              :style="{width: '100%'}"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="float:right" @click="handelConfirmEdit">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </el-dialog>
  </div>
</template>

<script>
import { CustomerActivityCreate, CustomerActivityDelete, CustomerActivityEdit, CustomerActivityGet } from '@/d/api/crm'
import { successMessage } from '@/d/utils/utils'

export default {
  inheritAttrs: false,
  data() {
    return {
      CustomerActivity: [],
      /* 表单 */
      formData: {
        method: undefined,
        content: undefined,
        customer_id: undefined
      },
      formDataEdit: {
        id: undefined,
        method: undefined,
        content: undefined
      },
      rules: {
        method: [{
          required: true,
          message: '请选择跟进方式',
          trigger: 'change'
        }],
        content: [{
          required: true,
          message: '请输入跟进内容',
          trigger: 'blur'
        }]
      },
      methodOptions: [{
        'label': '发邮件',
        'value': '发邮件'
      }, {
        'label': '发消息',
        'value': '发消息'
      }, {
        'label': '打电话',
        'value': '打电话'
      }, {
        'label': '见面拜访',
        'value': '见面拜访'
      }],
      innerVisible: false
    }
  },
  created() {},
  methods: {
    onClose() {
      this.$refs['elForm'].resetFields()
      this.formData = this.$options.data().formData // 防止关闭再打开创建，留下编辑的信息
    },
    close() {
      this.$emit('update:visible', false)
    },
    handleClose(done) {
      this.$confirm('确定关闭窗口吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    async CustomerActivityGet(id) {
      // this.listLoading = true
      const result = await CustomerActivityGet({ customer_id: id })
      const { data } = result
      this.CustomerActivity = data
      // setTimeout(() => {
      //  this.listLoading = false
      // }, 500)
    },
    /* 表单 */
    SetCustomerInfo(row) {
      this.formData.customer_id = row.id
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.CustomerActivityCreate()
      })
    },
    async CustomerActivityCreate() {
      const { message } = await CustomerActivityCreate(this.formData)
      successMessage(this, '成功', message)
      // this.close()
      await this.CustomerActivityGet(this.formData.customer_id)
    },
    async CustomerActivityDelete(item) {
      const { message } = await CustomerActivityDelete({ customer_activity: [{ id: item.id }] })
      successMessage(this, '成功', message)
      // this.close()
      await this.CustomerActivityGet(this.formData.customer_id)
    },
    handleEdit(item) {
      this.formDataEdit = Object.assign({}, item)
      this.innerVisible = true
    },
    handleDelete(item) {
      this.$confirm('确定删除该跟进记录吗', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.CustomerActivityDelete(item)
        })
        .catch(_ => {})
    },
    handelConfirmEdit() {
      this.$refs['CustomerActivityEdit'].validate(valid => {
        if (!valid) return
        this.CustomerActivityEdit()
      })
    },
    async CustomerActivityEdit(item) {
      const { message } = await CustomerActivityEdit(this.formDataEdit)
      successMessage(this, '成功', message)
      await this.CustomerActivityGet(this.formData.customer_id)
      this.innerVisible = false
    }
  }
}
</script>
