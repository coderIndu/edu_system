<template>
  <div>
    <el-button v-if="item" type="success" @click="emits('itemClick')">{{ item }}</el-button>
    <el-button v-if="edit" type="danger" @click="emits('editClick')">{{ edit }}</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 设置公共数据
const props = defineProps({
  item: String,    // 按钮success的值
  edit: String      // 按钮danger的值
})
const emits = defineEmits([`itemClick`, `editClick`])
// 设置data数据


// methods部署


// 组件挂载
onMounted(() => {

})

</script>

<style lang="scss" scoped>
</style>
