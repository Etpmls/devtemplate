<template>
  <el-upload
    class="avatar-uploader"
    :action="avatarAction"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :headers="headers"
  >
    <img v-if="imageUrl" :src="ImageBaseUrl()" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
    <div slot="tip" class="el-upload__tip">
      只能上传不超过 200KB 的jpg格式的文件
    </div>
  </el-upload>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
import { getUserToken /* getBaseUrl*/ } from '@/d/utils/utils' // get token from cookie
import { AttachmentUploadImage } from '@/d/api/api'
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          path: undefined
        }
      }
    }
  },
  data() {
    return {
      image: this.value,
      imageUrl: '',
      avatarAction: AttachmentUploadImage(),
      headers: {}
    }
  },
  created() {
    this.setUploadHeader()
    if (this.image.path) {
      this.imageUrl = this.image.path
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      var rtnpath = res.data.path
      this.imageUrl = rtnpath
      this.$emit('update:value', { path: rtnpath })
    },
    beforeAvatarUpload(file) {
      const isRightSize = file.size / 1024 < 200
      if (!isRightSize) {
        this.$message.error('只能上传不超过 200KB 的jpg格式的文件')
      }
      const isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('只能上传图片格式')
      }
      return isRightSize && isAccept
    },
    setUploadHeader() {
      if (getUserToken()) {
        this.headers['token'] = getUserToken()
      }
    },
    ImageBaseUrl() {
      return process.env.VUE_APP_BASE_API + this.imageUrl
    }
  }
}
</script>
