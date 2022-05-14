<template>
  <el-button :type="type" :size="size">
    {{text}}
    <el-icon class="el-icon" v-if="icon">
      <component :is="icon"></component>
    </el-icon>
  </el-button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 设置公共数据
defineProps({
  type: String,   // 按钮类型
  icon: String,   // 图标
  size: String,   // 按钮大小
  text: String,   // 按钮内容
})

// 设置data数据


// methods部署


// 组件挂载
onMounted(() => {

})

</script>

<style lang="less" scoped>
</style>
