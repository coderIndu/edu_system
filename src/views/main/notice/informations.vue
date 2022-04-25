<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h3>软件1班公告</h3>
      </div>
    </template>
    <div :style="{color: urgency}" >请同学们抓紧时间交论文初稿！！！</div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

let urgency = ref('#f00')
</script>

<style lang="less" scoped>
 .box-card {
   /deep/.el-card__header {
     padding-top: 0;
     padding-bottom: 0;
   }
 }
</style>