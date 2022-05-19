<template>
  <div class="video" v-if="videoList.length">
    <div class="video-list-item" v-for="(item, index) in videoList" :key="index" @click="changeVideo(item)">
      <div class="item-head">
        <!-- <span class="item-index">{{$utils.formatZero(index + 1)}}</span> -->
        <div class="item-name">第{{ index + 1 }}课</div>
        <div class="item-time">
          <pyIconVue icon="Timer"></pyIconVue>
          {{ item.createDate }}
        </div>
      </div>
      <div class="item-footer">
        <pyIconVue icon="VideoCamera" size="20"></pyIconVue>
        <span class="item-footer-name">{{ item.name.replace(/\..*/, '')
        }}</span>
      </div>
    </div>
  </div>
  <!-- 无视频课程, 有文件 -->
  <div class="no-videos" v-if="fileList.length">
    <div>资源下载</div>
    <div class="file-item" v-for="(item, index) in fileList" :key="index">
      <div class="file-left">
        <pyIconVue icon="Files"></pyIconVue>
        <div class="file-name">{{ item.name }}</div>
      </div>
      <div class="file-edit">
        <pyButtonVue icon="Download" size="small" class="file-btn" @click="downloadFile(item)"></pyButtonVue>
        <pyButtonVue icon="View" size="small" class="file-btn" @click="previewFile(item)"></pyButtonVue>
      </div>
    </div>
  </div>
  <!-- 无资源 -->
  <div class="no-videos" v-else>
    无课程资源
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import pyIconVue from '../py/py-icon.vue';
import pyButtonVue from '../py/py-button.vue';

// 设置公共数据
const $http = inject('$http')
const $utils = inject('$utils')
const course = inject('course')   // 选择的课程数据
const emits = defineEmits(['getVideo', 'changeVideo'])

// 设置data数据
const videoList = ref([])
const fileList = ref([])          // 非视频类课程

// methods部署
const getCourseDetails = () => {    // 获取课程关联的文件以及聊天室内容
  const data = {
    id: course.id
  }
  $http.getCourseDetails(data).then(res => {
    if (res.status === 200) {
      videoList.value = res.data.file_list.filter(item => item.mimetype.includes('video'))
      fileList.value = res.data.file_list.filter(item => !item.mimetype.includes('video'))
      emits('getVideo', videoList.value)
    }
  }).catch(err => {
    console.log(err);
  })
}

const downloadFile = (item) => {    // 下载资源文件
  // const path = item.path
  $utils.downloadFile(item.path, item.name)
}

const previewFile = (item) => {     // 预览文件
  $utils.previewFile(item.path)
}

const changeVideo = (item) => {
  emits('changeVideo', item)
}

// 组件挂载
onMounted(() => {
  getCourseDetails()
})

// 导出数据


</script>

<style lang="less" scoped>
@import url('/src/common/common.less');

.video-list-item {
  .video-list-item();

  // 目录item
  .item-head {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;

    .item-name {
      margin-right: 10px;
    }

    .item-time {
      margin-top: 3px;
      font-size: 12px;
      color: #ccc;
    }
  }

  .item-footer {
    margin: 10px 0;
    display: flex;
    font-weight: normal;

    &-name {
      margin: 0 10px;
    }
  }
}

.no-videos {
  font-size: 16px;
  font-weight: 600;
}
</style>
