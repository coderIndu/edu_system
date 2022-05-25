<template>
  <div class="classplan">
    <TodayTable @showPage="showPage"></TodayTable>
    <LearnClass :course="selectCourse" v-if="showLearnPage" v-model="showLearnPage"></LearnClass>
  </div>
</template>

<script setup>
import {  ref, watch } from 'vue'
import LearnClass from './learnClass'
import TodayTable from './todayTable'

// 公共数据



// data数据
const showLearnPage = ref(false)
const selectCourse = ref('')

// methods
function showPage(select) {
  selectCourse.value = select
  showLearnPage.value = true
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
