<template>
  <el-input v-model="input" :placeholder="placeholder" @clear="emits('clear')" clearable @change="emits('change', input)" debounce>
    <template #append>
      <slot name="append"></slot>
    </template>
  </el-input>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 设置公共数据
defineProps({
  placeholder: String
})
const emits = defineEmits(['change', 'focus', 'blur', 'clear'])
// 设置data数据
const input = ref("")

// methods部署


// 组件挂载
onMounted(() => {
  // input.value.focus()
})

</script>

<style lang="less" scoped>

</style>
