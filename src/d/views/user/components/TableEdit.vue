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
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            :maxlength="50"
            show-word-limit
            clearable
            prefix-icon="el-icon-user"
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password" :required="isEdit === false">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            :maxlength="50"
            clearable
            prefix-icon="el-icon-lock"
            show-password
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-checkbox-group v-model="form.roles" size="medium">
            <el-checkbox
              v-for="(item, index) in rolesOptions"
              :key="index"
              :label="item"
              :disabled="item.disabled"
            >
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { RoleGet, UserCreate, UserEdit } from '@/d/api/api'
import { successMessage } from '@/d/utils/utils'
export default {
  components: {},
  inheritAttrs: false,
  props: [],
  data() {
    var checkPassword = (rule, value, callback) => {
      // 修改时对密码没有要求
      if ((!value && !this.isEdit) || (value && value.length < 6)) {
        return callback(new Error('请输入大于6位的密码'))
      }
      if (value && value.length > 50) {
        return callback(new Error('密码长度不能超过50个字符'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (value && value.length > 0) {
        callback()
      } else {
        callback(new Error('请输入用户名'))
      }
    }
    const validateRole = (rule, value, callback) => {
      if (value && value.length > 0) {
        callback()
      } else {
        callback(new Error('请选择角色'))
      }
    }
    return {
      form: {
        username: undefined,
        password: '',
        roles: []
      },
      rules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }
        ],
        password: [
          {
            validator: checkPassword,
            trigger: 'blur'
          }
        ],
        roles: [
          {
            required: true,
            type: 'array',
            trigger: 'change',
            validator: validateRole
          }
        ]
      },
      rolesOptions: [],
      title: '',
      isEdit: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.RoleGet()
  },
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form // 防止编辑关闭再打开创建，留下编辑的信息
      this.isEdit = false
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return
        if (this.isEdit) {
          this.UserEdit()
        } else {
          this.UserCreate()
        }
      })
    },
    showEdit(row) {
      if (!row) {
        this.title = '创建' + ' ' + '用户'
        this.isEdit = false
      } else {
        this.title = '修改' + ' ' + '用户'
        this.isEdit = true
        this.form = Object.assign({}, row)
        // 初始化roles，防止roles为null报错
        this.form.roles_tmp = this.form.roles
        this.form.roles = []
        if (this.form.roles_tmp != null) {
          for (var i = 0; i < this.form.roles_tmp.length; i++) {
            for (var v = 0; v < this.rolesOptions.length; v++) {
              if (this.form.roles_tmp[i].id === this.rolesOptions[v].id) {
                this.form.roles.push(this.rolesOptions[v])
                break
              }
            }
          }
        }
        delete this.form.roles_tmp
      }
    },
    RoleGet() {
      RoleGet().then((result) => {
        const { data } = result
        this.rolesOptions = data
      })
    },
    async UserCreate() {
      const { message } = await UserCreate(this.form)
      successMessage(this, '成功', message)
      this.close()
      this.$emit('refreshTable', true)
    },
    async UserEdit() {
      const { message } = await UserEdit(this.form)
      successMessage(this, '成功', message)
      this.close()
      this.$emit('refreshTable', true)
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
    min-width: 500px;
  }
</style>
