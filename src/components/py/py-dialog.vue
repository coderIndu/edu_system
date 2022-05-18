<template>
  <div class="dialog">
    <el-dialog
    v-model="dialogVisible"
    :model-value="true"
    :title="title || '弹窗'"
    :width="width || '30%'"
    @close="close"   
    :top="top || '25vh'"
    :close-on-click-modal="modalClose"
  >
    <span>
      <slot></slot>
    </span>
    <div class="dia-footer" v-if="isFooter">
      <el-button @click="close">{{cancelValue || '取消'}}</el-button>
      <el-button type="primary" @click="confirm">{{confirmValue || '确认'}}</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 设置公共数据
const props = defineProps({
  title: String,            // 标题
  width: String,            // 宽度
  cancelValue: String,      // footer的cancle按钮
  confirmValue: String,     // footer的confirm按钮
  closeFooter: Boolean,     // 是否显示footer
  top: String,              // top值
  modalClose: Boolean,      // 是否可以点击遮罩隐藏弹窗
})
const emits = defineEmits(['close', 'confirm'])
// 设置data数据
const dialogVisible = ref(true)
const isFooter = ref(true)

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
  console.log('py-dialog',props.closeFooter);
  if(props.closeFooter === true) {
    isFooter.value = false
  }
})

</script>

<style lang="less" scoped>
.dialog {
  position: relative;
}

.dia-footer {
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
