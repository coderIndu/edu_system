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
        <el-dropdown-item>
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
import { CircleCloseFilled, User, Tools } from '@element-plus/icons'
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()
const username = ref('未设置名称')

username.value = store.state.username.username

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

