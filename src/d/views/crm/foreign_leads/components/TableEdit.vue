<template>
  <div>
    <el-dialog v-bind="$attrs" :title="title" :before-close="handleClose" v-on="$listeners" @open="onOpen" @close="onClose">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="mini"
        label-width="100px"
        label-position="top"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入名称" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="国家" prop="country_id">
          <el-select v-model="formData.country_id" filterable placeholder="请选择国家" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in country_idOptions"
              :key="index"
              :label="item.area + ' - ' + item.name"
              :value="item.id"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <el-select v-model="formData.source" placeholder="请选择来源" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in sourceOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input
            v-model="formData.mobile"
            placeholder="请输入手机"
            clearable
            prefix-icon="el-icon-mobile-phone"
            :style="{width: '100%'}"
          />
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input
            v-model="formData.telephone"
            placeholder="请输入电话"
            clearable
            prefix-icon="el-icon-phone"
            :style="{width: '100%'}"
          />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input
            v-model="formData.email"
            placeholder="请输入电子邮箱"
            clearable
            prefix-icon="el-icon-message"
            :style="{width: '100%'}"
          />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input
            v-model="formData.address"
            placeholder="请输入地址"
            clearable
            prefix-icon="el-icon-map-location"
            :style="{width: '100%'}"
          />
        </el-form-item>
        <el-form-item label="行业" prop="industry">
          <el-input v-model="formData.industry" placeholder="请输入行业" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="级别" prop="level">
          <el-rate v-model="formData.level" :max="5" show-score />
        </el-form-item>
        <el-form-item label="下次联系时间" prop="next_time">
          <el-date-picker
            v-model="formData.next_time"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-ddTHH:mm:ss+08:00"
            :style="{width: '100%'}"
            placeholder="请选择下次联系时间"
            clearable
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="formData.remark"
            type="textarea"
            placeholder="请输入备注"
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          />
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
import { CountryGet, ForeignLeadsCreate, ForeignLeadsEdit } from '@/d/api/crm'
import { successMessage } from '@/d/utils/utils'

export default {
  components: {},
  inheritAttrs: false,
  props: [],
  data() {
    return {
      title: '',
      isEdit: false,
      formData: {
        name: undefined,
        country_id: 0,
        source: '未知',
        mobile: undefined,
        telephone: undefined,
        email: undefined,
        address: undefined,
        industry: undefined,
        level: 0,
        next_time: null,
        remark: undefined
      },
      rules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        country_id: [],
        source: [],
        mobile: [],
        telephone: [],
        email: [],
        address: [],
        industry: [],
        level: [],
        next_time: [],
        remark: []
      },
      country_idOptions: [],
      sourceOptions: [{
        'label': '未知',
        'value': '未知'
      }, {
        'label': 'Google',
        'value': 'Google'
      }, {
        'label': '广告',
        'value': '广告'
      }, {
        'label': '转介绍',
        'value': '转介绍'
      }, {
        'label': 'Facebook',
        'value': 'Facebook'
      }, {
        'label': 'Youtube',
        'value': 'Youtube'
      }, {
        'label': 'LinkedIn',
        'value': 'LinkedIn'
      }]
    }
  },
  computed: {},
  watch: {},
  created() {
    // 获取全部国家
    CountryGet().then((result) => {
      const { data } = result
      this.country_idOptions = data
      this.country_idOptions.unshift({ id: 0, name: '未知', area: '未知' })
    })
  },
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields() // 去掉第二次打开又显示validate的错误信息
      this.formData = this.$options.data().formData // 防止编辑关闭再打开创建，留下编辑的信息
      this.isEdit = false
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
    showEdit(row) {
      if (!row) {
        this.title = '创建线索'
        this.isEdit = false
      } else {
        this.title = '修改线索'
        this.isEdit = true
        this.formData = Object.assign({}, row)
        // [防止控制台报错]如果时间为go的默认空值，则next_time字段为空
        if (this.formData.next_time === '0001-01-01T00:00:00Z') {
          this.formData.next_time = null
        }
      }
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        if (this.isEdit) {
          this.ForeignLeadsEdit()
        } else {
          this.ForeignLeadsCreate()
        }
      })
    },
    async ForeignLeadsCreate() {
      const { message } = await ForeignLeadsCreate(this.formData)
      successMessage(this, '成功', message)
      this.close()
      this.$emit('refreshTable', true)
    },
    async ForeignLeadsEdit() {
      const { message } = await ForeignLeadsEdit(this.formData)
      successMessage(this, '成功', message)
      this.close()
      this.$emit('refreshTable', true)
    }
  }
}

</script>
<style>
.el-rate {
  display: inline-block;
  vertical-align: text-top;
}

</style>
