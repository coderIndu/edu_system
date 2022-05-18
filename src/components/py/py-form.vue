<template>
  <el-form :model="formData" :rules="rules" ref="ruleFormRef">
    <el-form-item v-for="(item, index) in itemData" :label="item.label" :prop="item.prop" :key="index">
      <el-input v-model="formData[item.prop]" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
// 设置公共数据
const props = defineProps({
  data: Array,          // el-form-item 的数据
  rules: Object,        // 验证规则
  initData: Object      // 初始化对象数据
})

// 设置data数据
const ruleFormRef = ref(null)
const formData = reactive(props.initData)
const itemData = ref(props.data)

// methods部署
const validate = (fn, err) => {
  ruleFormRef.value.validate(vaild => {
    if (vaild) {
      fn()
    } else {
      err()
    }
  })
}

// 组件挂载
onMounted(() => {
  
})

defineExpose({ formData, validate })
</script>

<style lang="scss" scoped>
</style>
