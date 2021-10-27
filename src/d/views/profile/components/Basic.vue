<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="80px">
      <el-form-item label="用户名">
        <el-input
          :placeholder="user.username"
          readonly
          :disabled="true"
          :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          :maxlength="200"
          clearable
          show-password
          :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <avatar :value.sync="form.avatar" />
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { UserUpdateInformation } from '@/d/api/api'
import { successMessage } from '@/d/utils/utils'
import Avatar from '@/d/components/avatar'
export default {
  components: { Avatar },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          username: '',
          email: '',
          avatar: '',
          role: ''
        }
      }
    }
  },
  data() {
    var checkPassword = (rule, value, callback) => {
      // 修改时对密码没有要求
      if (value && value.length < 6) {
        return callback(new Error('请输入密码'))
      }
      if (value && value.length > 50) {
        return callback(new Error('密码不能超过50个字符'))
      } else {
        callback()
      }
    }
    return {
      form: {
        password: '',
        avatar: this.user.avatar === undefined ? Object.assign({}) : Object.assign({ path: this.user.avatar })
      },
      rules: {
        username: [],
        password: [
          {
            validator: checkPassword,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.UserUpdateInformation()
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
    },
    async UserUpdateInformation() {
      const { message } = await UserUpdateInformation(this.form)
      successMessage(this, '成功', message)
    }
  }
}

</script>
<style>
</style>
