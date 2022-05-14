<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title || '弹窗'"
    :width="width || '30%'"
    @close="close"    
  >
    <span>
      <slot></slot>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">{{cancelValue || '取消'}}</el-button>
        <el-button type="primary" @click="confirm">{{confirmValue || '确认'}}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 设置公共数据
const props = defineProps({
  title: String,            // 标题
  width: String,            // 宽度
  cancelValue: String,      // footer的cancle按钮
  confirmValue: String,     // footer的confirm按钮
})
const emits = defineEmits(['close', 'confirm'])
// 设置data数据
const dialogVisible = ref(true)

// methods部署
const close = () => {
  dialogVisible.value = false
  emits('close')
}

const confirm = () => {
  dialogVisible.value = false
  emits('confirm')
}

// 组件挂载
onMounted(() => {

})

</script>

<style lang="less" scoped>

</style>
