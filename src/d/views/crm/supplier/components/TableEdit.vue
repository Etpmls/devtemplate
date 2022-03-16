<template>
  <div>
    <el-dialog v-bind="$attrs" title="Dialog Titile" v-on="$listeners" @open="onOpen" @close="onClose">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="mini"
        label-width="100px"
        label-position="top"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入单行文本名称" clearable :style="{width: '100%'}" />
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
        <el-form-item label="主营产品" prop="main_products">
          <el-tag
            v-for="(tag, i) in resetFiled.dynamicTags"
            :key="i"
            closable
            :disable-transitions="false"
            @close="handleCloseTag(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="resetFiled.inputVisible"
            ref="saveTagInput"
            v-model="resetFiled.inputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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
        <el-form-item label="网站" prop="website">
          <el-input
            v-model="formData.website"
            placeholder="请输入网站"
            clearable
            prefix-icon="el-icon-s-home"
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
        <el-form-item label="级别" prop="level">
          <el-rate v-model="formData.level" :max="5" show-score />
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
import { SupplierCreate, SupplierEdit } from '@/d/api/crm'
import { successMessage } from '@/d/utils/utils'

export default {
  components: {},
  inheritAttrs: false,
  props: [],
  data() {
    return {
      resetFiled: {
        /* 标签- 主营产品 */
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
        /* 标签- 主营产品 */
      },
      formData: {
        name: undefined,
        source: '',
        mobile: undefined,
        telephone: undefined,
        email: undefined,
        website: undefined,
        address: undefined,
        level: 0,
        remark: undefined,
        main_products: undefined
      },
      rules: {
        name: [{
          required: true,
          message: '请输入单行文本名称',
          trigger: 'blur'
        }],
        source: [],
        mobile: [],
        telephone: [],
        email: [],
        website: [],
        address: [],
        level: [],
        remark: []
      },
      sourceOptions: [{
        'label': '1688',
        'value': '1688'
      }, {
        'label': '百度',
        'value': '百度'
      }, {
        'label': '抖音',
        'value': '抖音'
      }, {
        'label': '广告',
        'value': '广告'
      }, {
        'label': '转介绍',
        'value': '转介绍'
      }, {
        'label': '其他',
        'value': '其他'
      }]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields() // 去掉第二次打开又显示validate的错误信息
      this.formData = this.$options.data().formData // 防止编辑关闭再打开创建，留下编辑的信息
      this.resetFiled = this.$options.data().resetFiled // 防止编辑关闭再打开创建，留下编辑的信息
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
        this.title = '创建供应商'
        this.isEdit = false
      } else {
        this.title = '修改供应商'
        this.isEdit = true
        this.formData = Object.assign({}, row)
        // [防止控制台报错]如果时间为go的默认空值，则next_time字段为空
        // if (this.formData.next_time === '0001-01-01T00:00:00Z') {
        //  this.formData.next_time = null
        // }
        // 修改页面，把json的标签转化为数组
        this.resetFiled.dynamicTags = this.handleTag(this.formData.main_products)
      }
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // 把主营产品变成json传递
        this.formData.main_products = undefined
        if (this.resetFiled.dynamicTags.length !== 0) {
          this.formData.main_products = JSON.stringify(this.resetFiled.dynamicTags)
        }
        if (this.isEdit) {
          this.SupplierEdit()
        } else {
          this.SupplierCreate()
        }
      })
    },
    async SupplierCreate() {
      const { message } = await SupplierCreate(this.formData)
      successMessage(this, '成功', message)
      this.close()
      this.$emit('refreshTable', true)
    },
    async SupplierEdit() {
      const { message } = await SupplierEdit(this.formData)
      successMessage(this, '成功', message)
      this.close()
      this.$emit('refreshTable', true)
    },
    /* 标签-主营产品 */
    handleCloseTag(tag) {
      this.resetFiled.dynamicTags.splice(this.resetFiled.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.resetFiled.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.resetFiled.inputValue
      if (inputValue) {
        this.resetFiled.dynamicTags.push(inputValue)
      }
      this.resetFiled.inputVisible = false
      this.resetFiled.inputValue = ''
    },
    /* 标签-主营产品 */
    /* 处理主要产品json为标签 */
    handleTag(str) {
      if (str === '') {
        return []
      }
      return JSON.parse(str)
    }
    /* 处理主要产品json为标签 */
  }
}

</script>
<style>
.el-rate {
  display: inline-block;
  vertical-align: text-top;
}
/*标签-主营产品*/
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
/*标签-主营产品*/
</style>
