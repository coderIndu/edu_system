<template>
<el-dialog v-model="dialogTableVisible" top="5%" title="文件预览" @close="close" width="50%" ref="iframeRef">
  <embed :src="src" width="100%" height="100%"/>
</el-dialog>
</template>

<script setup>  
import { nextTick } from 'process';
import { ref, onMounted } from 'vue'
// 设置公共数据
const props = defineProps({
  src: String
})
const emits = defineEmits(['close'])

// 设置data数据
const dialogTableVisible = ref(true)
const iframeRef = ref(null)

// methods部署
const close = () => {
  dialogTableVisible.value = false
  emits('close')
}

// 组件挂载
onMounted(() => {
  nextTick(() => {
    const imgEl = document.querySelector('#preview')
    console.dir(imgEl);
    console.dir();
  })
})

</script>

<style lang="less" scoped>
// img {
//   height: 100%;
// }
</style>
