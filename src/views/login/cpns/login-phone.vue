<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="formData">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model.number="formData.code"></el-input>
          <el-button v-if="isBtnClick" @click="getCode" type="primary" class="getcode-btn">获取验证码</el-button>
          <el-button v-else type="info" disabled class="getcode-btn">{{ countdown + 's重新获取' }}</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { showMsg } from '@/utils/showMsg';
import { ref, reactive, inject } from 'vue'
import { useStore } from 'vuex';
import { rules } from '../config/phone-config'

// 公告数据
const $http = inject('$http')
const store = useStore()

// data
const formData = reactive({email: '',code: ''})
const isBtnClick = ref(true)
const emailCode = ref("")
let countdown = ref(60)


// methods
const getCode = () => {
  // 发送验证码
  isBtnClick.value = !isBtnClick.value
  if (formData.email == '') {
    isBtnClick.value = !isBtnClick.value
    showMsg.err('请输入邮箱')
  } else if (isBtnClick.value === false) {
    console.log("开始倒计时")
    sendEmailCode()
    
    let timer = setInterval(() => {
      countdown.value--  
      if (countdown.value <= 0) {
        clearInterval(timer) // 清除定时器
        isBtnClick.value = !isBtnClick.value
      }
    }, 1000);
  }
}

const sendEmailCode = () => {     // 发送邮箱
  const data = {
    email: formData.email
  }
  $http.sendEmailCode(data).then(res => {
    emailCode.value = res.data.code
  })
}

const check = () => {     // 验证输入的验证码是否和发送的一致
console.log(emailCode.value, formData.code);
  if(emailCode.value !== formData.code) {
    showMsg.err('验证码错误')
    return false
  } else {
    store.dispatch("login/accountLoginAction", formData)
  }
}
defineExpose({check, formData})
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
