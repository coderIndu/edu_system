<template>
<el-dialog v-model="dialogTableVisible" top="5%" title="文件管理" @close="close" width="80%">
  <iframe  width="100%" height="500" src="http://114.132.229.173:8012/onlinePreview?url=aHR0cDovLzExNC4xMzIuMjI5LjE3Mzo1MDAwL2FwaS9yZXNvdXJjZS8xNjUyNTkwMTM2NjE0X2J1dHRvbi5qcGVn" title="W3Schools Free Online Web Tutorials"></iframe>
</el-dialog> 
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 设置公共数据
const emits = defineEmits(['close'])
const props = defineProps({
  show: Boolean
})
// 设置data数据
const dialogTableVisible = ref(props.show)

// methods部署
const close = () => {
  dialogTableVisible.value = false
  emits('close')
}

// 组件挂载
onMounted(() => {
  console.log(23333);
})

</script>

<style lang="less" scoped>

</style>
