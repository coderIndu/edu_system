<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" width="50" />
    <el-table-column property="createDate" label="创建时间" :formatter="formatTime" />
    <el-table-column property="updateDate" label="更新时间" :formatter="formatTime" />
    <el-table-column property="name" label="课程名称" />
    <el-table-column property="create_name" label="创建人" />
    <!-- 操作部分 -->
    <el-table-column label="操作">
      <template #default="scope">
        <pyButtonVue size="small" text="开始学习" type="primary" @click="learnClass(scope.row)"></pyButtonVue>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, inject, reactive, onMounted, } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import pyButtonVue from '@/components/py/py-button.vue';

const store = useStore()
const $http = inject('$http')
const $utils = inject('$utils')
const router = useRouter()
const emit = defineEmits(['showPage'])

const userInfo = store.state.userInfo
const widget = reactive({
  class_id: userInfo.class_id,
  create_id: userInfo.role !== 'student' && userInfo.userid,
  page: 1,
  size: 10
})
const tableData = ref([])

// methods
const getCourseList = () => {  // 获取课程列表
  $http.getCourseList(widget).then(res => {
    tableData.value = res.data.list
  })
}

const formatTime = (row) => {   // 格式化日期
  return $utils.formatDate(row.updateDate)
}

function learnClass(select) {       // 学习课程
  emit('showPage', select)
}  

onMounted(() => {
  getCourseList()
})
</script>

<style lang="less" scoped>
</style>