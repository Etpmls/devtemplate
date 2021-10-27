<template>
  <div class="app-container">
    <el-alert
      title="欢迎"
      type="success"
      description="感谢您使用devtemplate"
      :closable="false"
      show-icon
    />
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style>
  .app-container {
    padding: 20px;
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

<style lang="scss" scoped>
  .app-container {
    background: #f5f7f8 !important;

  .card {
    min-height: 420px;
  }

  .table {
    width: 100%;
    color: #666;
    border-collapse: collapse;
    background-color: #fff;

  td {
    position: relative;
    min-height: 20px;
    padding: 9px 15px;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid #e6e6e6;

  &:nth-child(odd) {
     width: 20%;
     text-align: right;
     background-color: #f7f7f7;
   }
  }
  }

  }
</style>
