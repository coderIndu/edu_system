<template>
  <div class="classplan">
    <component :is="showLearnPage ? LearnClass : TodayTable" @showPage="showPage"></component>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import LearnClass from './learnClass'
import TodayTable from './todayTable'

const router = useRouter()
const route = useRoute()
let showLearnPage = ref(false)

// 因为路由导航是异步的，导致无法实时获取query，监听属性，设置。
function showPage() {
  showLearnPage.value = true
}

watch(() => route.query, (query) => {
  if(Object.keys(query).length === 0) {
    showLearnPage.value = false
  }
})
</script>

<style lang="less" scoped >
.classplan {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #f6f6f6;
  // background-color: rgb(221, 82, 82);
}


</style>
