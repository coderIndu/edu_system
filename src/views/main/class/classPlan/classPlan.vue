<template>
  <div class="classplan">
    <!-- 新建删除部分 -->
    <pyTableHeadVue item="新建" edit="删除" @itemClick="showAddCourse=true" @editClick="removeMany" ></pyTableHeadVue>
    <!-- 表格内容 -->
    <el-table :data="data.list" border size="large" @select="tableSelect" table-layout="auto" highlight-current-row :default-sort="{ prop: 'createDate', order: 'descending' }">
      <!-- 选择框 -->
      <el-table-column type="selection" width="55" /> 
       <!-- 日期 -->
      <el-table-column label="创建日期" prop="createDate" sortable>
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ $utils.formatDate(scope.row.createDate) }}</span>
          </div>
        </template>
      </el-table-column>
      <!-- 班级 -->
      <el-table-column prop="class_name" label="所属班级"></el-table-column>
      <el-table-column prop="name" label="课程名称" />
      <!-- 操作 -->
      <el-table-column prop="address" label="操作" class="edit">
        <template #default="scope">
          <el-button type="primary" @click="showUpload=true;chooseItem=scope.row" size="small" plain>上传资源</el-button>
          <el-button type="danger" size="small" plain @click="removeOne(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pyPaginationVue :total="data.total" :limit="data.limit" @currentChange="currentChange"></pyPaginationVue>
    <!-- 上传资源弹窗 -->
    <UpDialog  v-model="showUpload" :courseInfo="chooseItem"></UpDialog>
    <!-- 添加课程弹窗 -->
    <addCourse v-if="showAddCourse" @close="showAddCourse=false" @confirm="getData"></addCourse>
  </div>
</template>

<script setup>
import { inject, ref, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import UpDialog from '@/components/common/up-dialog/index.vue'
import pyPaginationVue from '@/components/py/py-pagination.vue';
import pyTableHeadVue from '@/components/py/py-tableHead.vue';
import addCourse from '@/components/classPlan/addCourse.vue';
// 设置公共数据
const $http = inject('$http')
const $utils = inject('$utils')
const store = useStore()
const { showMsg } = inject('$utils')

// 设置data数据
const data = ref({});             // 列表数据
const showUpload = ref(false)     // 弹窗控制部分
const showAddCourse = ref(false)  // 显示增加课程弹窗
const widget = reactive({         // 获取列表的请求参数
  create_id: store.state.user_id,
  limit: 10,
  page: 1
})
const chooseItem = ref([])        // 选中的item


// methods部署
function getData() {      // 获取课程列表
  console.log(widget);
  $http.getCourseList(widget).then(res => {
    data.value = res.data
  })
}

function currentChange(val) {  // 切换页数请求数据
  widget.page = val
  getData()
}

function tableSelect(select, row) {   
  chooseItem.value = select
}

function removeOne(select) {  // 删除单个课程
  let { id } = select
  $http.removeCourse(id).then(res => {
    if(res.data.deletedCount) {
      showMsg.success('删除成功')
      getData()
    } else {
      showMsg.err('删除失败')
    }
  })
}

function removeMany() {   // 删除多个课程
  const ids = chooseItem.value.map(item => item.id)
  $http.dropManyCourse({ids}).then(res => {
    if(res.data.deletedCount) {
      showMsg.success('删除成功')
      getData()
    } else {
      showMsg.err('删除失败')
    }
  })
}
// 组件挂载
onMounted(() => {
  getData()
})


</script>

<style lang="less" scoped>
.classplan {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #f6f6f6;
  /deep/.cell {
    display: flex;
    .upload-demo {
      margin-right: 1.25rem;
    }
  }

  .el-table {
    margin: 5px 0;
  }
}
</style>
