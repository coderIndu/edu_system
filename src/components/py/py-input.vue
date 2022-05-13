<template>
  <el-input v-model="value" :placeholder="placeholder" clearable ref="input"/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 设置公共数据
const value = defineProps({
  value: String,
  placeholder: String
})

// 设置data数据
const input = ref(null)

// methods部署


// 组件挂载
onMounted(() => {
  input.value.focus()
})

</script>

<style lang="scss" scoped>

</style>
