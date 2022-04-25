<template>
  <div>
    <el-dialog v-model="dialogTableVisible" fullscreen top="5vh" title="上传" @close="close" width="90%" :modal="false">
      <!-- 上传下载部分 -->
      <div class="header-edit" width="150px">
        <el-button type="primary" plain>
        上传<el-icon class="el-icon--right" size="large"><Upload /></el-icon>
        </el-button>
        <el-button type="success" plain>
          批量下载<el-icon class="el-icon--right" size="large"><Download /></el-icon>
        </el-button>
      </div>
      <!-- 主体表单部分 -->
      <el-table :data="tableData" stripe>
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
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import { Upload, Download } from '@element-plus/icons-vue'
const emit = defineEmits(['close'])   // 设置emit

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

// 组件挂载
onMounted(()=>{

})
</script>

<style lang="less" scoped>
.header-edit {
  margin-bottom: 20px;
}
</style>