<template>
  <pyInput placeholder="请输入搜索内容" @change="change" @clear="emits('clear')" @input="change">
    <template v-slot:append>
      <pyButton icon="Search" @click="emits('search', input)"></pyButton>
    </template>
  </pyInput>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import pyButton from './py-button.vue';
import pyInput from './py-input.vue';

// 设置公共数据
const emits = defineEmits(['change', 'search', 'blur', 'clear'])

// 设置data数据
const input = ref('')


// methods部署
const change = (value) => {
  input.value = value
  emits('change', value)
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
