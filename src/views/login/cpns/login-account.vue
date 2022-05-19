<template>
  <div class="login-account">
    <el-form label-width="60px" :model="account" ref="formRef">
      <el-form-item label="学号" prop="userid">
        <el-input v-model="account.userid"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input autocomplete="on" type="password" v-model="account.password" @keyup.enter="emit('login')"></el-input>
      </el-form-item>
       <el-form-item label="验证码" prop="code">
        <el-row>
          <el-col :span="10"><el-input size="large" autocomplete="on" type="text" v-model="account.code"></el-input></el-col>
        <el-col :span="10" class="login-code" v-html="codeSvg" @click="changeCode"></el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, defineExpose, ref, inject, onMounted } from 'vue';
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import { localCache } from '@/utils/cache'
import { debounce } from '@/utils/common/custom';
import { showMsg } from '@/utils/showMsg';

// 定义emit和props
const emit = defineEmits(['login'])

// 定义vuex
const store = useStore()
const $http = inject('$http')

// 定义用户名和密码
const account = reactive({
  userid: localCache.getCatch('userid'),
  password: localCache.getCatch('password'),
  code: ''
})
// 定义组件ref
const formRef = ref(null)
const codeSvg = ref("")
const codeText = ref("")

/* methods */
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
      if(account.code.toLocaleLowerCase() !== codeText.value.toLocaleLowerCase()) {
        showMsg.err('验证码不正确！')
        return
      }
      // 2. 开始登陆
      store.dispatch("login/accountLoginAction", account)
    }
  })
}

const getCode = () => {   // 请求验证码svg
  $http.getLoginCode().then(res => {
    codeSvg.value = res.data.data
    codeText.value = res.data.text
  })
}

const changeCode = () => { // 更改验证码  
  debounce(getCode, 500)()
}

onMounted(() => {
  getCode()
})
defineExpose({
  loginAction
})

</script>

<style lang="less" scoped>
.login-code {
  width: 200px;
  height: 50px;
  // height: 100%;
  // background-color: red;
  margin-left: 5px;
}
</style>
