<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      :title="title"
      :before-close="handleClose"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入名称"
            :maxlength="30"
            show-word-limit
            :readonly="form.id === 1"
            :clearable="form.id !== 1"
            prefix-icon="el-icon-user"
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入备注"
            :maxlength="200"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 4 }"
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <el-transfer
            v-model="form.permissions"
            :data="allPermission"
            :titles="['未添加', '已添加']"
            :props="{
              key: 'id',
              label: 'name',
            }"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { RoleCreate, RoleEdit, PermissionGet } from '@/d/api/api'
import { successMessage } from '@/d/utils/utils'
const emptyForm = {
  name: undefined,
  remark: undefined,
  permissions: []
}

export default {
  components: {},
  inheritAttrs: false,
  props: [],
  data() {
    const validateName = (rule, value, callback) => {
      if (value && value.length > 0) {
        callback()
      } else {
        callback(new Error('请输入名称'))
      }
    }
    return {
      form: {
        name: undefined,
        remark: undefined,
        permissions: []
      },
      rules: {
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: validateName
          }
        ],
        remark: []
      },
      title: '',
      isEdit: false,
      allPermission: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getAllPermission()
  },
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['form'].resetFields()
      this.form = Object.assign({}, emptyForm)
      this.isEdit = false
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return
        this.PermissionIdToObj()
        if (this.isEdit) {
          this.RoleEdit()
        } else {
          this.RoleCreate()
        }
      })
    },
    async RoleCreate() {
      const { message } = await RoleCreate(this.form)
      successMessage(this, '成功', message)
      this.close()
      this.$emit('refreshTable', true)
    },
    async RoleEdit() {
      const { message } = await RoleEdit(this.form)
      successMessage(this, '成功', message)
      this.close()
      this.$emit('refreshTable', true)
    },
    showEdit(row) {
      if (!row) {
        this.title = '创建' + ' ' + '角色'
        this.isEdit = false
      } else {
        this.title = '修改' + ' ' + '角色'
        this.isEdit = true
        this.form = Object.assign({}, row)
        if (!row.permissions) {
          this.form.permissions = []
        } else {
          var tmp = []
          for (var i = 0; i < this.form.permissions.length; i++) {
            tmp.push(this.form.permissions[i].id)
          }
          this.form.permissions = tmp
        }
      }
    },
    async getAllPermission() {
      const { data } = await PermissionGet()
      this.allPermission = data
    },
    PermissionIdToObj() {
      // 把permissionID转为对象
      if (this.form.permissions && this.form.permissions.length > 0) {
        var tmp = []
        for (var i = 0; i < this.form.permissions.length; i++) {
          tmp.push({ id: this.form.permissions[i] })
        }
        this.form.permissions = tmp
      }
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
    }
  }
}
</script>

<style>
.el-dialog {
  min-width: 800px;
}
</style>
