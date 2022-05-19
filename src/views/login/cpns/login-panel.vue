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
      <!-- 邮箱登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon>
              <cellphone />
            </el-icon>邮箱登录
          </span>
        </template>
        <login-phone ref="loginPhoneRef"/>
      </el-tab-pane>
    </el-tabs>
    <!-- 底栏 -->
    <div class="account-control">
      <el-checkbox v-model="isChecked">记住密码</el-checkbox>
      <el-link type="primary" @click="showReset = true">忘记密码</el-link>
      <el-link type="primary" @click="isShowDialog = true">注册</el-link>
    </div>
    <!-- 登录按钮 -->
    <el-button @click="getFormData" type="primary" class="login-btn">立即登录</el-button>
  </div>
  <!-- 修改密码弹窗 -->
  <pyDialog title="忘记密码" v-model="showReset" @confirm="resetPwd">
    <pyTabsVue :data="[{label: '账号', name: 'user'}, {label:'邮箱', name:'email'}]" v-model="chooseTab">
      <template v-slot:user>
        <pyForm :data="resetData" :initData="{ userid: '', prePwd: '', pwd: '', newPwd: '' }" ref="pyFormRef"></pyForm>
      </template>
      <template v-slot:email>
        <LoginPhone ref="resetLoginRef"></LoginPhone>
        <PyForm :data="resetEmailData" :initData="resetEmailInit" ref="emailRef"></PyForm>
      </template>
    </pyTabsVue>
    
  </pyDialog>
  <!-- 注册弹窗 -->
  <registerVue v-if="isShowDialog" @close="isShowDialog = false"></registerVue>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue'
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";
import { showMsg } from '@/utils/showMsg'
import pyDialog from '@/components/py/py-dialog.vue';
import pyForm from '@/components/py/py-form.vue';
import pyTabsVue from '@/components/py/py-tabs.vue';
import registerVue from '@/components/register.vue';
import PyForm from '@/components/py/py-form.vue';
import { useStore } from 'vuex';

// 公共数据
const $http = inject('$http')
const store = useStore()

// 定义属性
const isChecked = ref(true)
const loginAccountRef = ref()
const loginPhoneRef = ref()
const tabName = ref("account")
const isShowDialog = ref(false)  // 是否显示弹窗
const showReset = ref(false)
const emailRef = ref(null)      // email重置密码的ref
const resetLoginRef = ref(null) // 邮箱验证码的ref
const chooseTab = ref(null)     // 选择的重置密码的tab
const resetData = [
  { label: '账号', prop: 'userid' },
  { label: '原密码', prop: 'prePwd' },
  { label: '密码', prop: 'pwd' },
  { label: '确认密码', prop: 'newPwd' }
]
const pyFormRef = ref(null)
const resetEmailData = [  { label: '密码', prop: 'pwd' },{ label: '确认密码', prop: 'newPwd' }]
const resetEmailInit = { pwd: '', newPwd: ''}

// 点击开始登录
function getFormData() {
  if (tabName.value === 'account') {
    // 用户密码登录
    loginAccountRef.value?.loginAction(isChecked.value)
  } else {
    // 手机验证码登录
    const check = loginPhoneRef.value.check()
    if(check) {
      store.dispatch("login/accountLoginAction", loginPhoneRef.value.formData)
    }
  }
}

const resetPwd = () => {
  let data = pyFormRef.value.formData
  if(chooseTab.value === 'email') {
    data = {...emailRef.value.formData, ...resetLoginRef.value.formData}
  }
  // console.log(data, chooseTab.value);
  if (data.pwd !== data.newPwd) {
    showMsg.err('两次密码不一致, 请重新输入')
  } else if(!data.pwd || !data.newPwd) {
    showMsg.err('请输入密码！')
  } else if(data.prePwd === data.pwd) {
    showMsg.err('密码一致，无效更改')
  } else {    // 开始更改
    resetLoginRef.value.check()   // 验证邮箱验证码是否通过
    // console.log(data);
    $http.onUpdatedUser(data).then(res => {
      if (res.data.modifiedCount) {
        showMsg.success('更改成功')
        showReset.value = false
      } else {
        showMsg.err('更改失败')
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
