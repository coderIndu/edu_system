<!-- 头像部分 -->
<template>
  <el-dropdown size="large">
    <span class="header-icon">
      <el-avatar
        class="headImg"
        shape="square"
        size="small"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="cover"
      ></el-avatar>
      <span class="username">{{ username }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="quit">
          <el-icon>
            <circle-close-filled />
          </el-icon>退出登录
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon>
            <user />
          </el-icon>用户信息
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon>
            <tools />
          </el-icon>信息管理
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { localCache } from '@/utils/cache.js';


const store = useStore()
const router = useRouter()

const username = ref('匿名')  // 用户名

username.value = store.state.username.username

// 退出登录
function quit() { 
  localCache.clear()
  router.push('/login')
}
</script>

<style lang="less" scoped>
.header-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .headImg {
    cursor: pointer;
    margin-right: 5px;
  }
}
</style>

