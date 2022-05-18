<template>
  <div>
    <pyDialogVue :title="course.name" width="80%" top="5vh" @close="close" :closeFooter="true" :modalClose="false">
      <div class="main">
        <!-- 资源列表 -->
        <div class="video-list">
          <videoListVue></videoListVue>
        </div>
      </div>
    </pyDialogVue>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import pyDialogVue from "@/components/py/py-dialog.vue";
import videoListVue from "@/components/todayClass/videoList.vue";

// 公共数据
const props = defineProps({
  course: Object
})
const emits = defineEmits(['close'])
provide('course', props.course)

// data数据
// methods 
const close = () => {
  emits('close')
}

onMounted(() => {

})
</script>

<style lang="less" scoped>
@import url('/src/common/common.less');

.main {
  display: flex;

  &-left {
    flex: .5;
    display: flex;
    flex-direction: column;
  }
}


 .video-list {
    // 视频列表
    width: 100%;
 }
 


// 弹窗自定义样式
/deep/ .el-dialog {
  height: 900px;
  padding: 0;
  margin-left: 15vw;
  overflow: auto;
}
</style>
