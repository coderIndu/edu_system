<template>
  <div class="edit file-item">
    <div class="edit-left">
      <pyButton icon="AlarmClock" :disabled="isClock"></pyButton>
      是否打卡：<span :class="isClock ? 'clock_is':'clock'">{{isClock ? '已打卡': '未打卡'}}</span>
    </div>
    <div class="edit-right">
      <pyButton :disabled="isClock" icon="WindPower" text="打卡" @click="courseClock"></pyButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import pyButton from '@/components/py/py-button'
import { useStore } from 'vuex';

// 设置公共数据
const store = useStore()
const course = inject('course')
const userInfo = store.state.userInfo
const $http = inject('$http')
const $utils = inject('$utils')

// 设置data数据
const isClock = ref(false)

// methods部署
const courseClock = () => {     // 课程打卡
  let course_id = course.id
  const query = {
    course_id,
    userid: userInfo.userid
  }

  $http.addClock(query).then(res => {
    if(res.data.matchedCount) {
      $utils.el_notice('打卡', '打卡成功', 'success')
      isClock.value = true
    }
  })
}

// 组件挂载
onMounted(() => {
  isClock.value =  course.card_list.includes(userInfo.userid) // 是否打过卡
})

</script>

<style lang="less" scoped>
@import url('/src/common/common.less');

.edit-left {
  .clock {
    color: red;
  }
  .clock_is {
    color: #ccc;
  }
}

</style>
