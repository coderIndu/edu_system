<template>

  <div class="login-panel">
    <h1 class="title">网上教学平台</h1>
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
        <login-account ref="loginAccountRef" @login="getFormData" />
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
      <el-link type="primary" @click="showReset=true">忘记密码</el-link>
      <el-link type="primary" @click="isShowDialog=true">注册</el-link>
    </div>
    <!-- 登录按钮 -->
    <el-button @click="getFormData" type="primary" class="login-btn">立即登录</el-button>
  </div>
    <!-- 修改密码弹窗 -->
  <pyDialog v-if="showReset" @close="showReset=false"  @confirm="resetPwd">
    <pyForm :data="resetData" :initData="{userid: '',  prePwd:'', pwd:'', newPwd:''}" ref="pyFormRef"></pyForm>
  </pyDialog>
  <!-- 注册弹窗 -->
  <!-- <Register v-if="isShowDialog" @close="isShowDialog=false"></Register> -->
  <registerVue v-if="isShowDialog" @close="isShowDialog=false"></registerVue>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue'
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";
import { showMsg } from '@/utils/showMsg'
import pyDialog from '@/components/py/py-dialog.vue';
import pyForm from '@/components/py/py-form.vue';
import registerVue from '@/components/register.vue';

// 公共数据
const $http = inject('$http')

// 定义属性
const isChecked = ref(true)
const loginAccountRef = ref()
const loginPhoneRef = ref()
const tabName = ref("account")
const isShowDialog = ref(false)  // 是否显示弹窗
const showReset = ref(false)
const resetData = [
  {label: '账号', prop: 'userid'},
  {label: '原密码', prop: 'prePwd'},
  {label: '密码', prop: 'pwd'}, 
  {label:'确认密码', prop:'newPwd'}
  ]
const pyFormRef = ref(null)

// 点击开始登录
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

const resetPwd = () =>{
  const data = pyFormRef.value.formData
  if(data.pwd !== data.newPwd) {
    showMsg.err('两次密码不一致, 请重新输入')
  } else {
    $http.onUpdatedUser(data).then(res => {
      if(res.data.modifiedCount) {
        showMsg.success('更改成功')
        showReset.value = false
      } else {
        showMsg.err(res.data.msg)
      }
    }).catch(err => {
      console.log(err);
    })
  }

  
}
// 显示弹窗



</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 350px;
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
