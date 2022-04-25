<template>
  <div class="nav-header">
    <el-icon class="fold" :size="20" @click="handleFoldChange">
      <grid />
    </el-icon>
    <div class="content">
      <div>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item v-for="(item, index) of breadcrumbList" :to="{ }" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <NavHeaderIcon></NavHeaderIcon>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { Grid, ArrowRight } from '@element-plus/icons'
import { useRouter } from 'vue-router'
import NavHeaderIcon from './navHeaderIcon'
import { useMapStates } from '@/utils/useMapStore.js'

const router = useRouter()

let isFold = ref(false)
const emit = defineEmits(['foldChange'])

const handleFoldChange = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}

// 面包屑
// 筛选面包屑title
const { breadcrumb } = useMapStates(['breadcrumb'], 'header')
const breadcrumbList = ref(breadcrumb)

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
    height: 80%;
  }
}
</style>
