<template>
  <el-dialog :model-value="show" top="5%" title="文件管理" @close="close" width="80%">
    <!-- 上传下载部分 -->
    <div class="header-edit" width="150px">
      <!-- 上传 -->
      <el-upload
        class="upload-demo"
        :http-request="handleChange"
        :show-file-list="false"
        action=""
      >
        <el-button type="primary" plain class="btn">
          上传<el-icon class="el-icon--right" size="large"><Upload /></el-icon>
        </el-button>
      </el-upload>
      <!-- 下载 -->
      <el-button type="success" plain class="btn" @click="download(chooseItem)">
        批量下载<el-icon class="el-icon--right" size="large"><Download /></el-icon>
      </el-button>
    </div>
    <!-- 主体表单部分 -->
    <el-table v-loading="loading"  element-loading-text="上传中" class="el-dialog__body" :data="tableData" stripe @select="select" ref="tableRef">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="文件名" />
      <el-table-column prop="size" label="文件大小">
        <template #default="scope">
          {{$utils.formatSize(scope.row.size)}}
        </template>
      </el-table-column>
      <el-table-column prop="createData" label="更新时间" />
      <el-table-column  label="操作">
        <template #default="scope">
          <el-button type="danger" size="small" plain @click="download([scope.row])">下载</el-button>
          <el-button type="danger" size="small" plain @click="preview(scope.row)">预览</el-button>
          <el-button type="danger" size="small" plain @click="remove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup>
import {ref, onMounted, watch, inject} from 'vue'
import { useStore } from 'vuex'

// 获取全局属性和方法
const $http = inject('$http')
const $utils = inject('$utils')
// const $apis = inject('$apis')
const { showMsg } = inject('$utils')
const store = useStore()
const props = defineProps({
  courseInfo: Object,
  show: Boolean
})
// 设置emit
const emit = defineEmits(['close', 'update:show'])

// 设置data
const tableData = ref([])       // table数据
const chooseItem = ref([])      // 选中的item
const tableRef = ref(null)      // table的ref
const loading = ref(false)      // 上传显示加载

/**
 * 设置methods
 */
// 弹窗关闭事件
const close = () => {
  emit('update:show', false)
}

// 选中
const select = (select) => {
  chooseItem.value = select
}

// 上传文件
const handleChange = (source) => {
  loading.value = true
  // 1. 文件信息
  const data = {
    name: source.file.name,
    mimetype: source.file.type,
    lastModifiedDate: source.file.lastModifiedDate,
    size: source.file.size,
    file: source.file,
    course_id: props.courseInfo.id,
    class_id: props.courseInfo.class_id,
    create_id: store.state.userInfo.userid
  }
  // source.file.splice(1, 1024*1024)
  // 2. 发送文件
  $http.uploadFile(data).then(res => {
    if(res.status === 200) {
      showMsg.success("上传成功")
      getFileList()
      loading.value = false
    } 
  }).catch(err => {
      showMsg.err('上传失败')
      loading.value = false
  })
}

// 获取文件列表
const getFileList = () => {
  const query = {
    course_id: props.courseInfo.id,
    class_id: props.courseInfo.class_id
  }
  $http.getFileList($utils.parseParams(query)).then(res => {
    tableData.value = res.data.list
  })
}

// 删除文件
const remove = (id=null) => {
  if(id !== null) chooseItem.value.push({id})
  const ids = chooseItem.value.map(item => item.id)
  $http.removeFiles({ids}).then(res => {
    if(res.data.msg) {
      showMsg.success("删除成功")
      getFileList()
    } else {
      showMsg.err("删除失败")
    }
  })
}

// 下载文件
const download = (select) => {
  select.forEach(item => {
    $utils.downloadFile(item.path, item.name)
  })
  chooseItem.value = []
  tableRef.value.clearSelection()
}
// 文件预览
const preview = (select) => {
  const url = select.path
  $utils.previewFile(url)
}


onMounted(() => {
  // console.log(2333)
  getFileList()
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

.el-dialog {
  left: 4%;
}

.btn {
  // margin:0 10px;
  margin-right: 10px;
}
</style>