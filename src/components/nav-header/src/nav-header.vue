<template>
  <div class="nav-header">
    <el-icon v-if="isFold" class="fold" :size="20" @click="handleFoldChange">
      <d-arrow-right />
    </el-icon>
    <el-icon v-else class="fold" :size="20" @click="handleFoldChange">
      <d-arrow-left />
    </el-icon>
    <div class="content">
      <div>
        <el-breadcrumb @click="getRoutePath">
          <el-breadcrumb-item>homepage</el-breadcrumb-item>
          <el-breadcrumb-item>t</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <NavHeaderIcon></NavHeaderIcon>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { DArrowLeft, DArrowRight } from '@element-plus/icons'
import { useRouter } from 'vue-router'
import NavHeaderIcon from './nav-header-icon.vue'

let isFold = ref(false)
const emit = defineEmits(['foldChange'])
const router = useRouter()

const handleFoldChange = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}

const getRoutePath = () => {
  console.log(router.currentRoute.value.fullPath)
}

</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  .fold {
    margin-left: -10px;
  }

  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
