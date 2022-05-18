<template>
  <el-button :type="type" :size="size" :disabled="disabled">
    {{text}}
    <pyIcon :icon="icon"></pyIcon>
  </el-button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import pyIcon from '@/components/py/py-icon'

// 设置公共数据
defineProps({
  type: String,   // 按钮类型
  icon: String,   // 图标
  size: String,   // 按钮大小
  text: String,   // 按钮内容
  disabled: Boolean, // 是否禁用
})

// 设置data数据


// methods部署


// 组件挂载
onMounted(() => {

})

</script>

<style lang="less" scoped>
</style>
