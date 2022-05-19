<template>
  <div class="login-account">
    <el-form label-width="60px" :model="account" ref="formRef">
      <el-form-item label="学号" prop="userid">
        <el-input v-model="account.userid"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input autocomplete="on" type="password" v-model="account.password" @keyup.enter="emit('login')"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, defineExpose, ref } from 'vue';
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import { localCache } from '@/utils/cache'

// 定义emit和props
const emit = defineEmits(['login'])

// 定义vuex
const store = useStore()

// 定义用户名和密码
const account = reactive({
  userid: localCache.getCatch('userid'),
  password: localCache.getCatch('password') 
})
// 定义组件ref
const formRef = ref()

// 发送请求
const loginAction = (isChecked = true) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log("验证成功，开始登陆")

      // 1. 是否记住密码
      if (isChecked) {
        console.log("记住密码")
        localCache.setCatch("userid", account.userid)
        localCache.setCatch("password", account.password)
      } else {
        // 取消记住
        console.log("取消记住")
        localCache.deleteCache('userid')
        localCache.deleteCache('password')
      }

      // 2. 开始登陆
      store.dispatch("login/accountLoginAction", account)
    }
  })
}

defineExpose({
  loginAction
})

</script>

<style lang="less" scoped>
</style>
