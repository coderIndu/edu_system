<template>
  <div class="system">
    <!-- 专业班级 -->
    <div class="main-left">
      <div class="view-name">{{ userInfo.profession }}</div>
      <!-- 专业人员柱状图 -->
      <div class="view-pro"></div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, inject } from 'vue'
import { useStore } from 'vuex';
import { barOption } from './config'

// 设置公共数据
const $http = inject('$http')
const store = useStore()
const echarts = window.echarts

// 设置data数据
const userInfo = store.state.userInfo
const barData = ref([])

// methods部署
const initOption = (option, className) => {   // 挂载数据到Dom
  const charDom = document.querySelector(className)
  const myChart = echarts.init(charDom)
  option && myChart.setOption(option);
}

const getBarData = () => {
  const query = {
    pf_id: userInfo.pf_id
  }
  $http.getCountList(query).then(res => {
    barData.value = res.data
    const option = initData(barData.value.list, barOption)  // 处理数据
    initOption(option, '.view-pro')                         // 渲染页面
  }).catch(err => {
    console.log(err);
  })
}

const initData = (data, option) => {         // 处理数据和配置
  const xData = data.map(item => item.name)
  const countData = data.map(item => item.count)
  option.xAxis.data = xData
  option.series[0].data = countData
  return option
}
// 组件挂载
onMounted(() => {
  getBarData()
})

</script>

<style lang="less" scoped>
.main-left {
  width: 100%;

  .view-name {
    font-size: 24px;
    font-weight: 600;
  }

  .view-pro {   // 柱状图
    width: 50%;
    height: 500px;
    // background-color: #ccc;
  }

  
}
</style>
