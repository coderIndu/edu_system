<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="tabName">
      <!-- 用户登录 -->
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon>
              <user-filled />
            </el-icon>用户登录
          </span>
        </template>
        <login-account ref="loginAccountRef" />
      </el-tab-pane>
      <!-- 手机登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon>
              <cellphone />
            </el-icon>手机登录
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <!-- 选择底栏 -->
    <div class="account-control">
      <el-checkbox v-model="isChecked">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!-- 登录按钮 -->
    <el-button @click="getFormData" type="primary" class="login-btn">立即登录</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Cellphone, UserFilled } from "@element-plus/icons-vue"
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";

// 定义属性
const isChecked = ref(true)
const loginAccountRef = ref()
const loginPhoneRef = ref()
const tabName = ref("account")

// 定义方法
function getFormData() {

  // console.log("点击成功")
  if (tabName.value === 'account') {
    // 用户密码登录
    loginAccountRef.value?.loginAction(isChecked.value)
  } else {
    // 手机验证码登录
    console.log(loginPhoneRef)
  }

}

</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }
  .el-icon {
    vertical-align: baseline;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
