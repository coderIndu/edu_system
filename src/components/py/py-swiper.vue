<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, i) in 4" :key="i">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper';
import 'swiper/css/swiper.css';

// 设置公共数据


// 设置data数据


// methods部署
const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};

// 组件挂载
onMounted(() => {

})

</script>

<style lang="less" scoped>
</style>
