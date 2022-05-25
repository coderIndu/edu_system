<template>
  <!-- 按钮部分 -->
  <div class="information">
    <div class="release">
      <el-button type="success" v-auth @click="showDialog = true">新建</el-button>
    </div>

    <!-- 公告部分 -->
    <Notice ref="noticeRef"></Notice>

    <!-- 新建弹窗 -->
    <pyDialogVue title="新建公告" v-model="showDialog" @confirm="confirm">
      <addNoticeVue ref="addRef"></addNoticeVue>
    </pyDialogVue>
  </div>

</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import pyDialogVue from '@/components/py/py-dialog.vue';
import addNoticeVue from './addNotice'
import Notice from './noticelist.vue';

/* 公共数据 */
const $http = inject('$http')
const $utils = inject('$utils')
const store = useStore()
const { userid, pf_id } = store.state.userInfo


/* data数据 */
const showDialog = ref(false)     // 显示弹窗
const addRef = ref(null)          // addNoticeVue的ref
const noticeRef = ref(null)       // notice的Ref        

/* methods */
const confirm = () => {          // 新增公告
  // console.log(noticeRef.value);
  const { class_name, status, notice } = addRef.value
  if (!notice) { $utils.el_notice("新增失败", "请输入内容", 'error'); return }

  const data = {
    create_id: userid,
    pf_id,
    class_name,
    status,
    notice
  }

  $http.addNotice(data).then(res => {   // 添加公告
    if (res.data) {
      $utils.el_notice("新增公告", "新增成功", 'success')
      noticeRef.value.getList()     // 刷新列表
    }
  }).catch(err => {
    console.log(err);
    $utils.el_notice("新增失败", "新增失败", 'error')
  })
}


/** 
 * 生命周期
 */
onMounted(() => {
  
})
</script>

<style lang="less" scoped>
.information {
  overflow: auto;
}
.release {
  margin: 10px;
}

/deep/ .el-textarea__inner {
  width: 100%;
  height: 300px;
}
</style>