<template>
  <pyInput placeholder="请输入搜索内容" @input="change" @clear="emits('update:modelValue', input)">
    <template v-slot:append>
      <pyButton icon="Search" @click="emits('update:modelValue', input)"></pyButton>
    </template>
  </pyInput>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import pyButton from './py-button.vue';
import pyInput from './py-input.vue';

defineProps({
  modelValue: String
})

// 设置公共数据
const emits = defineEmits(['change', 'search', 'blur', 'clear', 'update:modelValue'])

// 设置data数据
const input = ref('')


// methods部署
const change = (value) => {
  input.value = value
  emits('update:modelValue', input.value)
}

// 组件挂载
onMounted(() => {
})

</script>

<style lang="less" scoped>
.el-input {
  width: 250px;
}
</style>
