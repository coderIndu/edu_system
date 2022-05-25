<template>
  <div class="system">
    <!-- 专业班级 -->
    <div class="main-left">
      <!-- <div class="view-name">{{ userInfo.profession }}</div> -->
      <!-- 专业人员柱状图 -->
      <div class="view-pro"></div>
    </div>
    <!-- 折线图 -->
    <div class="main-right"></div>
  </div>
</template>


<script setup>
import { ref, onMounted, inject } from 'vue'
import { useStore } from 'vuex';
import { barOption, lineOption } from './config'

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
  charDom.removeAttribute('_echarts_instance_')   // 防止页面路由切换echarts不会重新渲染
  const myChart = echarts.init(charDom)
  option && myChart.setOption(option);
}

const getBarData = () => {      // 获取图形数据
  const query = {
    pf_id: userInfo.pf_id
  }
  $http.getCountList(query).then(res => {
    barData.value = res.data
    barOption.title.text = userInfo.profession
    const option = initData(barData.value.list, barOption)  // 处理数据
    initOption(option, '.view-pro')                         // 渲染页面
  }).catch(err => {
    console.log(err);
  })
}

const getSevenData = () => {    // 获取近七天数据
  $http.getSeven().then(res => {
    console.log(res.data);
    lineOption.xAxis.data = res.data.map(item => item.time).reverse()
    lineOption.series[0].data = res.data.map(item => item.data)
    
    initOption(lineOption, '.main-right')
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
  getSevenData()
})

</script>

<style lang="less" scoped>
.system {
  display: flex;
}

.main-left {
  flex: 1;

  .view-name {
    font-size: 24px;
    font-weight: 600;
  }

  .view-pro {   // 柱状图
    width: 100%;
    height: 500px;
    // background-color: #ccc;
  }
}

.main-right {
  flex: 1;
  height: 500px;
}
</style>
