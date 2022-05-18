<template>
  <div class="video-list-item">
    <div class="video-name">名称：{{course.name}}</div>
    <div class="video-author">上传者：{{course.create_name}}</div>
    <div class="video-size">创建时间：{{$utils.formatDate(course.createDate)}}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
// 设置公共数据
const course = inject('course')   // 选择的课程的数据
const $utils = inject('$utils')

// 设置data数据


// methods部署


// 组件挂载
onMounted(() => {

})

</script>

<style lang="less" scoped>
@import url('/src/common/common.less');
.video-list-item {
  .video-name {
    // 视频名称
    font-size: 15px;

  }

  .video-author {
    // 视频创建人
    font-size: 15px;
  }

  .video-size {
    font-size: 15px;
  }
}
</style>
