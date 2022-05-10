<template>
  <div class="nav-menu">
    <div class="log">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-show="!roll">系统管理</span>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical"
      :collapse="roll"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <el-sub-menu :index="index + ''" v-for="(item, index) in usermenu" :key="index">
        <template #title>
          <navIcon :icon="item.icon" />
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          :index="index + '-' + i"
          v-for="(tag, i) in item.children"
          :key="i"
          @click="[handleMenuItemClick(tag.url), getActiveIndex(index + '-' + i)]"
        >{{ tag.name }}</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { defineProps, ref  } from 'vue'
import { useStore } from 'vuex'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import navIcon from './nav-icon.vue';
import { sessionCache } from "@/utils/cache"
import { useMapStates } from "@/utils/useMapStore.js"


// 定义模块数据
const props = defineProps({
  roll: { 
    type: Boolean,
    defalut: false
  }
})
const router = useRouter()
const store = useStore()

// 获取vuex中的值
const loginStates = useMapStates(['menus'], 'login') // login

// 定义组件数据
const usermenu = loginStates.menus    // 路由菜单
const activeIndex = ref(sessionCache.getCatch('activeIndex') || '0-0')  // 默认显示的菜单路由


// 设置菜单刷新后位置
const getActiveIndex = (index) => {
  // 设置刷新页面后的菜单默认位置
  sessionCache.setCatch('activeIndex', index) 
}
// 点击菜单跳转路由
const handleMenuItemClick = (item) => {
  router.push({
    path: item ?? '/notFound'
  })
}

// 组件内路由导航守卫
onBeforeRouteUpdate((to, from) => {  // 组件路由改变后触发
  // 设置面包屑
  store.commit("header/setBreadcrumb", to.fullPath)
}) 

</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
  .log {
    display: flex;
    height: 60px;
    // padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 60%;
      margin: 0 20px 0 10PX;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      margin-left: -2px !important;
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }

  .icon {
    // width: px;
    // height: 10px;
    margin-right: 2px;
    color: #fff;
    outline: none;
    padding: 0;
    border: 0;
    background-color: #0c2135;
  }
}
</style>
