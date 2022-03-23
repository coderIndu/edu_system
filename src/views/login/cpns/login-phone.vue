<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code"></el-input>
          <el-button v-if="isBtnClick" @click="getCode" type="primary" class="getcode-btn">获取验证码</el-button>
          <el-button v-else type="info" disabled class="getcode-btn">{{ countdown + 's重新获取' }}</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { rules } from '../config/phone-config'

const phone = reactive({
  num: '',
  code: '',
})
let isBtnClick = ref(true)
let countdown = ref(60)
const getCode = () => {
  // 发送验证码
  isBtnClick.value = !isBtnClick.value
  if (phone.num == '') {
    isBtnClick.value = !isBtnClick.value
    alert("请输入手机号")
  } else if (isBtnClick.value === false) {
    console.log("开始倒计时")
    let timer = setInterval(() => {
      countdown.value--

      if (countdown.value <= 0) {
        clearInterval(timer) // 清除定时器
        isBtnClick.value = !isBtnClick.value
      }
    }, 1000);
  }

}
</script>

<style lang="less" scoped>
.get-code {
  display: flex;
  .getcode-btn {
    margin-left: 10px;
    width: 100px;
  }
}
</style>
