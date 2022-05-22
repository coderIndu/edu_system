<template>
  <el-pagination background layout="prev, pager, next" 
  v-model:page-size="currentLimit" v-model:currentPage="currentPage" v-model:total="currentTotal" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// 设置公共数据
const props = defineProps({
  total: Number,    // 总数
  limit: Number,    // 每页显示数目
  page: Number      // 当前页数
})

const currentTotal = ref(0)
const currentLimit = ref(0)
const currentPage = ref(1)

const emits = defineEmits(['currentChange', 'update:total','update:limit'])

// 设置data数据


// methods部署
const handleCurrentChange = (val) => {    // 分页切换事件监听
  emits('currentChange', val)
}
// 组件挂载
onMounted(() => {
  
})

watch(props, (val) => {
  currentTotal.value = val.total
  currentLimit.value = val.limit
  currentPage.value = val.page  
}, {deep: true})

watch(currentPage,(val) => {
  emits('currentChange', val)
})
</script>

<style lang="scss" scoped>

</style>
