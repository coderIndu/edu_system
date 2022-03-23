<template>
  <div class="nav-menu">
    <div class="log">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-show="!props.roll">系统管理</span>
    </div>

    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical"
      :collapse="props.roll"
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
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { defineProps, computed, ref } from 'vue'
import navIcon from './nav-icon.vue';
import { sessionCache } from "@/utils/cache"

const router = useRouter()

const store = useStore()

// data
const usermenu = computed(() => store.state.login.menu).value

const activeIndex = ref(sessionCache.getCatch('activeIndex') ?? '0-0')

const getActiveIndex = (index) => {
  sessionCache.setCatch('activeIndex', index)
  console.log(sessionCache.getCatch('activeIndex'))
}


const props = defineProps({
  roll: {
    type: Boolean,
    defalut: false
  }
})
const handleMenuItemClick = (item) => {
  router.push({
    path: item ?? '/notFound'
  })
  // console.log("233", item)
}
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
  .log {
    display: flex;
    height: 35px;
    // padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 80%;
      margin: 0 17px;
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
