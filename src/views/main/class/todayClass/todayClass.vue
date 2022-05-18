<template>
  <div class="classplan">
    <TodayTable @showPage="showPage"></TodayTable>
    <LearnClass :course="selectCourse" v-if="showLearnPage" @close="showLearnPage=false"></LearnClass>
  </div>
</template>

<script setup>
import router from '@/router';
import {  ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LearnClass from './learnClass'
import TodayTable from './todayTable'

// 公共数据
const route = useRoute()


// data数据
const showLearnPage = ref(false)
const selectCourse = ref('')

// methods
function showPage(select) {
  selectCourse.value = select
  showLearnPage.value = true
  // const route = {
  //   name: 'studyDetails',
  //   path: '/main/class/studyDetails',
  //   component: LearnClass,
  // }
  // router.addRoute('main', route)
  // router.options.routes.push(route)
  // router.push('/main/class/studyDetails?course='+selectCourse.value)
  // console.log(router.options.routes);
  
  
}

</script>

<style lang="less" scoped >
.classplan {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #f6f6f6;
}


</style>
