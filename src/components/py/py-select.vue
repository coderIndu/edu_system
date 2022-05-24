<template>
  <el-select 
    v-model="value" class="m-2" placeholder="Select" 
    size="large" :multiple="multiple"
    @change="emits('update:valueModel', value)">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"/>
  </el-select>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 设置公共数据
const props = defineProps({
  valueModel: String,
  options: Array,
  multiple: Boolean
})
// 
const emits = defineEmits(['update:valueModel'])

// 设置data数据
const value = ref('')

// methods部署


// 组件挂载
onMounted(() => {
})

</script>

<style lang="less" scoped>

</style>
