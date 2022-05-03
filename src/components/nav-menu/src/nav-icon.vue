<template>
  <el-icon v-if="props.icon == 'Menu'">
    <Menu />
  </el-icon>

  <el-icon v-else-if="props.icon == 'Calendar'">
    <Calendar />
  </el-icon>

  <el-icon v-else-if="props.icon == 'Monitor'">
    <Monitor />
  </el-icon>

  <el-icon v-else-if="props.icon == 'OfficeBuilding'">
    <OfficeBuilding />
  </el-icon>

  <el-icon v-else-if="props.icon == 'User'">
    <User />
  </el-icon>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
  }
})
</script>

<style lang="less" scoped>
</style>
