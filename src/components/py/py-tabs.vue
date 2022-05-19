<template>
  <div class="vedio-list">
    <el-tabs v-model="activeName" class="demo-tabs" :type="type" @tab-click="emits('update:modelValue', $event.paneName)">
      <el-tab-pane v-for="(item,index) in data" :label="item.label" :name="item.name" :key="index">
        <slot :name="item.name"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 设置公共数据
const props = defineProps({
  modelValue: String,
  count: Number, // tab的个数，与data长度对应
  data: Array,   // el-tab-pane数组详情 {label: '', name: ''}
  type: String,  // tab类型
})
const emits = defineEmits(['update:modelValue'])

// 设置data数据
const activeName = ref("")

// methods部署
const change = (name) => {
  console.log(name);
}

// 组件挂载
onMounted(() => {
  activeName.value = props.data[0].name
})

</script>

<style lang="scss" scoped>
</style>
