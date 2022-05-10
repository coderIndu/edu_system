<template>
  <el-pagination background layout="prev, pager, next" :page-size="limit" :total="total"  @update:current-page="handleCurrentChange"/>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 设置公共数据
const props = defineProps({
  total: Number,    // 总数
  limit: Number,    // 每页显示数目
})

const emits = defineEmits(['currentChange'])

// 设置data数据


// methods部署
const handleCurrentChange = (val) => {    // 分页切换事件监听
  emits('currentChange', val)
}
// 组件挂载
onMounted(() => {

})

</script>

<style lang="scss" scoped>

</style>
