<template>
  <vue3VideoPlay v-bind="videoOption" title="" />
  <pyTabs :data="tabs" >
    <!-- 课程详情插槽 -->
    <template v-slot:details>
      <videoDetails></videoDetails>
    </template>
    <!-- 课程目录插槽  -->
    <template v-slot:list>
      <videoContent @getVideo="getVideo" @changeVideo="changeVideo"></videoContent>
    </template>
    <!-- 操作插槽 -->
    <template v-slot:edit>
      <clockInVue></clockInVue>
    </template>
  </pyTabs>
</template>

<script setup>
import { ref, onMounted, inject, reactive } from 'vue'
import pyTabs from '@/components/py/py-tabs'
import videoDetails from '@/components/todayClass/videoDetails' // 课程详情tab
import videoContent from '@/components/todayClass/videoContent' // 课程目录tab
import clockInVue from './clockIn.vue'                          // 课程操作tab
import options from '@/views/main/class/todayClass/config/video'

// 设置公共数据


// 设置data数据
const tabs = [{label: "课程详情",name: "details"}, {label: "目录",name: "list"}, {label:"操作", name: "edit"}]
const videoOption = reactive({...options})
// methods部署
const getVideo = (list) => {    // 获取视频列表
  if(list.length) {
     videoOption.src =  list[0].path
  }   // 默认播放第一个视频
}

const changeVideo = (item) => {
  videoOption.src !== item.path && (videoOption.src = item.path)
}

// 组件挂载
onMounted(() => {
  
})

</script>

<style lang="less" scoped>
</style>
