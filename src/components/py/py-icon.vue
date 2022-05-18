<template>
  <el-icon class="el-icon" v-if="icon">
    <component :is="icon"></component>
  </el-icon>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 设置公共数据
defineProps({
  icon: String,   // 图标
  size: String,   // 大小 number
  color: String,  // 颜色
})

// 设置data数据


// methods部署


// 组件挂载
onMounted(() => {

})

</script>

<style lang="less" scoped>
</style>
