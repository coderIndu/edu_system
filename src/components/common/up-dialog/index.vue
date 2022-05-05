<template>
  <el-dialog v-model="dialogTableVisible" top="5%" title="文件管理" @close="close" width="70%">
    <!-- 上传下载部分 -->
    <div class="header-edit" width="150px">
      <!-- 上传 -->
      <el-upload
        class="upload-demo"
        :http-request="handleChange"
        :show-file-list="false"
        action=""
      >
        <el-button type="primary" plain>
          上传<el-icon class="el-icon--right" size="large"><Upload /></el-icon>
        </el-button>
      </el-upload>
      <!-- 下载 -->
      <el-button type="success" plain>
        批量下载<el-icon class="el-icon--right" size="large"><Download /></el-icon>
      </el-button>
    </div>
    <!-- 主体表单部分 -->
    <el-table class="el-dialog__body" :data="tableData" stripe>
      <el-table-column type="selection" width="55" />
      <el-table-column property="fileName" label="文件名" width="150" />
      <el-table-column property="fileSize" label="文件大小" width="200" />
      <el-table-column property="updateTime" label="更新事件" />
      <el-table-column  label="操作">
        <el-button type="danger" size="small" plain>下载</el-button>
        <el-button type="danger" size="small" plain>删除</el-button>
        <el-button type="danger" size="small" plain>重命名</el-button>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup>
import {ref, onMounted, inject} from 'vue'
// 获取全局属性和方法
const $http = inject('$http')
const $apis = inject('$apis')
const { showMsg } = inject('$utils')

// 设置emit
const emit = defineEmits(['close'])
const dialogTableVisible = ref(true)  // 是否显示

const tableData = [{
  fileName: "计算机导论.pdf",
  fileSize: '1M',
  updateTime: '2022-04-12'
}]
// 弹窗关闭事件
const close = () => {
  dialogTableVisible.value = false
  emit('close', '')
}

// 上传部分
const handleChange = async (source) => {
  console.log(source);
  // 1. 文件信息
  let para = {
    name: source.file.name,
    type: source.file.type,
    lastModifiedDate: source.file.lastModifiedDate,
    size: source.file.size,
    file: source.file
  }
  // 2. 发送文件
  const res = await $http.post($apis.uploadFile, para, 'formData')
  console.log(res);
  // 3. 接受响应
  // if(res.data.status === 200) {  // 上传成功
  //   showMsg.success('上传成功')
  // } else {
  //   showMsg.err('网络异常，请重试')
  // }
}

onMounted(() => {
  console.log('dialog')
})
</script>

<style lang="less" scoped>
.header-edit {
  margin-bottom: 20px;
  display: flex;
}

.el-dialog__body{
  height: 50vh;
  overflow: auto;
}
</style>