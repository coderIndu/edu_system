<template>

  <el-card :body-style="{ padding: '0px' }">
    <img class="head-icon" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
    
    <div style="padding: 14px;">
      <!-- 表单 -->
      <el-form :model="ruleForm" :rules="register_user" label-width="80px" ref="formRef">
        <el-form-item class="form-item" v-for="(item, index) in formArr" :key="index" :label="item.label" :prop="item.value">
          <el-input v-model="formData[item.value]"></el-input>
        </el-form-item>
        <!-- 操作部分 -->
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit" size="default">修改</el-button>
          <el-button type="danger" size="default">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { register_user } from '@/common/rules'    // 表单验证配置
import { form, formArr } from './config'                   // form表单配置

// 设置公共数据


// 设置data数据
const formData = reactive(form)
const formRef = ref(null)

// methods部署


// 组件挂载
onMounted(() => {

})

</script>

<style lang="less" scoped>
.el-card {
  width: 50%;
  padding: 10px;

  /deep/.el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.head-icon {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin: 0 auto;
}

.form-item {
  margin: 40px 0 !important;
}
.form-item:first-child {
  margin: 0 !important;
}
</style>
