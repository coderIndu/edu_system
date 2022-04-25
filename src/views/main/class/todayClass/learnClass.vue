<template>
  <div>
    <h2>{{ className }}</h2>
    <div class="main">
      <vue3VideoPlay
        v-bind="options"
        :title="className"
      />
      <div class="info">
      
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import vedioConfig from './config/vedio'

const route = useRoute()

const className = ref('')
const options = vedioConfig

watch(() => route.query, (query) => {
  className.value = query.className
})

</script>

<style lang="less" scoped>
.main {
  display: flex;
  
}
</style>
