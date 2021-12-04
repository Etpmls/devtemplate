<template>
  <div class="app-container">
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <div class="left-panel">
        <el-button class="top-element" icon="el-icon-plus" type="primary" size="small" @click="handleAdd">
          创建
        </el-button>
        <el-button class="top-element" icon="el-icon-delete" type="danger" size="small" @click="handleDelete">
          删除
        </el-button>
      </div>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <div class="right-panel">
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.search" class="top-element" size="small" placeholder="标题" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              class="top-element"
              native-type="submit"
              size="small"
              @click="handleQuery"
            >
              搜索
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      stripe
      :data="list"
      :element-loading-text="'加载中' + '...'"
      @selection-change="setSelectRows"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      />
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row :gutter="24">
              <el-col :span="20" :offset="2">
                <el-divider content-position="left">操作面板</el-divider>
                <el-button type="success" size="mini" plain @click="LeadsConvertToCustomer(props.row.id)">转化为客户</el-button>

                <el-divider content-position="left">详细信息</el-divider>
                <el-descriptions class="margin-top" :column="2" border>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-user" />
                      名称
                    </template>
                    {{ props.row.name }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-s-comment" />
                      来源
                    </template>
                    {{ props.row.source }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-s-flag" />
                      行业
                    </template>
                    {{ props.row.industry }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-location-information" />
                      国家
                    </template>
                    <div v-if="props.row.country.name === ''">
                      未知
                    </div>
                    <div v-else>
                      {{ props.row.country.name }}
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-receiving" />
                      Email
                    </template>
                    {{ props.row.email }}
                  </el-descriptions-item>

                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-mobile-phone" />
                      移动电话
                    </template>
                    {{ props.row.mobile }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-phone" />
                      固定电话
                    </template>
                    {{ props.row.telephone }}
                  </el-descriptions-item>

                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-office-building" />
                      下次联系时间
                    </template>
                    <div v-if="props.row.next_time !== '0001-01-01T00:00:00Z'">
                      {{ $moment(props.row.next_time).format('YYYY-MM-DD') }}
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-star-off" />
                      评分
                    </template>
                    <template>
                      <el-rate
                        v-model="props.row.level"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}"
                      />
                    </template>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-office-building" />
                      地址
                    </template>
                    {{ props.row.address }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-tickets" />
                      备注
                    </template>
                    {{ props.row.remark }}
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>

          </el-form>

        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="名称"
        prop="name"
        min-width="200"
      />
      <el-table-column
        show-overflow-tooltip
        label="来源"
        prop="source"
        sortable
      />
      <el-table-column
        show-overflow-tooltip
        label="国家"
        prop="country.name"
        sortable
      />
      <el-table-column
        show-overflow-tooltip
        label="Email"
        prop="email"
        min-width="200"
      />
      <el-table-column
        show-overflow-tooltip
        label="评分"
        prop="level"
        sortable
      >
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.level"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          />
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="下次联系时间"
        prop="next_time"
        sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.next_time !== '0001-01-01T00:00:00Z'">{{ $moment(scope.row.next_time).format('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="180px"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.number"
      :layout="layout"
      :page-size="queryForm.size"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <table-edit
      ref="edit"
      :visible.sync="isShow"
      @refreshTable="fetchData"
    />
  </div>
</template>

<script>
import { ForeignLeadsDelete, LeadsConvertToCustomer } from '@/d/api/crm'
import TableEdit from './components/TableEdit'
import { successMessage, errorTextMessage, deleteConfirmMessage, confirmMessage } from '@/d/utils/utils'
import { ForeignLeadsGet } from '@/d/api/crm'
export default {
  name: 'ComprehensiveTable',
  components: {
    TableEdit
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      background: true,
      selectRows: '',
      queryForm: {
        number: 1,
        size: 100,
        search: ''
      },
      isShow: false // 添加编辑的框是否显示
    }
  },
  created() {
    this.fetchData()
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    setSelectRows(val) {
      this.selectRows = val
    },
    handleAdd() {
      this.isShow = true // 显示添加编辑的框
      this.$refs['edit'].showEdit()
    },
    handleEdit(row) {
      this.isShow = true // 显示添加编辑的框
      this.$refs['edit'].showEdit(row)
    },
    handleDelete(row) {
      if (row.id) {
        deleteConfirmMessage(this, '是否删除当前项', async() => {
          const { message } = await ForeignLeadsDelete({ leads: [{ id: row.id }] })
          successMessage(this, '成功', message)
          this.fetchData()
        })
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item)
          deleteConfirmMessage(this, '是否删除选中项', async() => {
            const { message } = await ForeignLeadsDelete({ leads: ids })
            successMessage(this, '成功', message)
            this.fetchData()
          })
        } else {
          errorTextMessage(this, '请选择您要删除的项')
          return false
        }
      }
    },
    handleSizeChange(val) {
      this.queryForm.size = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.queryForm.number = val
      this.fetchData()
    },
    handleQuery() {
      this.queryForm.number = 1
      this.fetchData()
    },
    async fetchData() {
      this.listLoading = true
      const result = await ForeignLeadsGet(this.queryForm)
      const { data, count } = result
      this.list = data
      this.total = count
      setTimeout(() => {
        this.listLoading = false
      }, 500)
    },
    LeadsConvertToCustomer(id) {
      confirmMessage(this, '是否把当前线索转化为客户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }, async() => {
        const { message } = await LeadsConvertToCustomer({ leads: { id: id }})
        successMessage(this, '成功', message)
        this.fetchData()
      })
    }
  }
}
</script>

<style>
  .right-panel {
    float: right;
    margin: 10px;
  }
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
  .el-pagination {
    padding: 2px 5px;
    margin: 15px 0 0 0;
    font-weight: normal;
    text-align: center;
    overflow: hidden;
  }
  /*展开CSS*/
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
