<template>
  <el-container>
    <el-aside :width="isRoll ? '60px' : '210px'">
      <NavMenu :roll="isRoll"></NavMenu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <NavHeader @foldChange="foldChange"></NavHeader>
      </el-header>
      <!-- 主体内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { NavMenu } from '@/components/nav-menu';
import { NavHeader } from '@/components/nav-header';
import { ref, onMounted, inject } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const {showMsg} = inject('$utils')
let isRoll = ref(false)

// 切换导航显示隐藏
const foldChange = (isFold) => {
  isRoll.value = isFold
  console.log(isFold)
}

onMounted(() => {
  showMsg.success(`欢迎${store.state.username}~awa~到来`)
})
</script>

<style scoped lang="less">
.el-container {
  .el-header {
    background-color: #f6f6f6;
    color: var(--el-text-color-primary);
    height: 40px;
    // text-align: center;
    // line-height: 30px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: var(--el-text-color-primary);
    text-align: center;
    height: 100vh;
  }
  .el-main {
    background-color: #f9f9f9;
  }
}
</style>