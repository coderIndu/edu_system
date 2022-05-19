<template>
  <div class="notice-list" v-if="noticeList.length">
    <el-card class="box-card" v-for="(item, index) in noticeList" :key="index">
      <template #header>
        <div class="card-header">
          <h3>{{ item.class_name }} <span class="card-header-time">{{$utils.formatDate(item.updateDate)}}</span></h3>
        </div>
      </template>
      <div class="notice-item">
        <span>{{ item.notice }}</span>
        <el-tag v-if="item.status === 0" effect="dark" type="info" style="margin-left: 20px;">{{ initStatus(item.status) }}</el-tag>
        <el-tag v-else-if="item.status === 1" effect="dark" type="warning" style="margin-left: 20px;">{{ initStatus(item.status) }}</el-tag>
        <el-tag v-else effect="dark" type="danger" style="margin-left: 20px;">{{ initStatus(item.status) }}</el-tag>
        <div class="edit">
          <pyButton v-auth type="primary" icon="Edit" @click="showDialog = true;currentNotice=item"></pyButton>
          <pyButton v-auth type="danger" icon="Delete" @click="delNotice(item._id)"></pyButton>
        </div>
      </div>
    </el-card>
  </div>
  <div class="no-notice" v-else>暂无公告</div>
  <!-- 编辑公告 -->
  <pyDialogVue title="编辑公告" v-model="showDialog" @confirm="editNotice">
    <addNoticeVue ref="addRef"></addNoticeVue>
  </pyDialogVue>
</template>

<script setup>
import { ref, onMounted, inject, reactive } from 'vue'
import { useStore } from 'vuex'
import pyButton from '@/components/py/py-button'
import pyDialogVue from '@/components/py/py-dialog.vue';
import addNoticeVue from './addNotice'

// 设置公共数据
const $http = inject('$http')
const $utils = inject('$utils')
const store = useStore()
const { userid, className } = store.state.userInfo

// 设置data数据
const noticeList = ref([])        // 公告列表
const statusList = reactive({
  type: "",
  value: ""
})
const showDialog = ref(false)     // 编辑窗口
const currentNotice = ref({})     // 编辑的内容
const addRef = ref(null)          // 编辑后的内容获取

/** computed */
const initStatus = (status) => {
  switch (status) {
    case 0:
      statusList.type = "info"
      return "普通"
    case 1:
      statusList.type = "warning"
      return "一般紧急"
    case 2:
      return "紧急"
    default:
      break;
  }
}

// methods部分
const getList = () => {           // 获取列表
  const query = {
    // class_name: className,
    userid
  }
  $http.getNoticeList(query).then(res => {
    noticeList.value = res.data
  })
}

const delNotice = (id) => {       // 删除公告
  const query = {
    id
  }
  $http.delNotice(query).then(res => {
    if(res.data.deletedCount) {
      $utils.el_notice("公告操作", "删除成功", 'success')
      getList()
    } else {
      $utils.el_notice("公告操作", "删除失败", 'error')
    }
  })
}

const editNotice = () => {      // 编辑公告
  console.log(addRef.value);
  const data = {
    id: currentNotice.value._id,
    update: {...addRef.value}
  }

  $http.editNotice(data).then(res => {
    if(res.data.modifiedCount) {
      $utils.el_notice("公告操作", "编辑成功", 'success')
      getList()     // 编辑成功,更新列表
    } else {
      $utils.el_notice("公告操作", "编辑失败", 'error')
    }
   
  })
}

defineExpose({
  getList
})
// 组件挂载
onMounted(() => {
  getList()
})

</script>

<style lang="less" scoped>
.card-header-time {
  font-size: 14px;
  color: #ccc;
  margin-left: 20px;
}

.no-notice {
  font-size: 24px;
  font-weight: 600;
  margin-left: 10px;
}

.notice-list {
  height: 100%;
  overflow: auto;
}

.el-card {
  width: 60%;
}

.box-card {
  margin: 10px;
  /deep/.el-card__header {
    padding-top: 0;
    padding-bottom: 0;
  }

  .notice-item {
    position: relative;

    .edit {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}

.tag-item {
  height: 30px;
  margin: 10px 0;
}
</style>
