<!-- 注册页面组件 -->
<template>
  <el-dialog :model-value="true" @close="emit('close')" title="用户新增" top="25vh" width="40%">
    <el-form
      ref="ruleFormRef"
      :model="userForm"
      status-icon
      :rules="rule"
      class="demo-userForm"
      label-position="center"
      label-width="100px"
      @validate="pwdValidate"
    > 
      <el-row justify="space-between">
        <!-- 身份 -->
        <el-col :span="12">  
          <el-form-item label="身份" prop="role">
            <el-select v-model="userForm.role" class="m-2" placeholder="Select" size="large">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 学号/教师号 -->
        <el-col :span="12">
          <el-form-item :label="userForm.role === 'student' ? '学号':'教师号'" prop="userid">
            <el-input v-model="userForm.userid" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="space-between">
          <!-- 姓名 -->
        <el-col :span="12"> 
          <el-form-item label="姓名" prop="username">
            <el-input v-model="userForm.username" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <!-- 密码 -->
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password" type="password"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- 确认密码 -->
        <el-col :span="12">
          <el-form-item label="确认密码" prop="confirmPwd" ref="confirmPwdRef" :error="confirmPwdError">
            <el-input v-model="userForm.confirmPwd" type="password"/>
          </el-form-item>
        </el-col>
        <!-- 手机号码 -->
        <el-col :span="12">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="userForm.phone"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="space-between">
         <!-- 专业 -->
        <el-col :span="12">
          <el-form-item label="专业" prop="profession">
            <el-input v-model="userForm.profession" />
          </el-form-item>
        </el-col>
        <!-- 班级 -->
        <el-col :span="12">
          <el-form-item label="班级" prop="className">
            <el-input v-model="userForm.className" />
          </el-form-item>
        </el-col>
      </el-row>

       <el-row justify="space-between">
         <!-- 地址 -->
        <el-col :span="12">
          <el-form-item label="地址" prop="address">
            <el-input v-model="userForm.address" />
          </el-form-item>
        </el-col>
        <!-- 邮箱 -->
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userForm.email" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交表单部分 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(userForm)">提交</el-button>
        <el-button @click="resetForm(userForm)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, defineEmits, reactive, inject } from 'vue'
import { rules, form } from '@/views/login/config/account-config'
import { onRegister } from '@/service/login'

// 设置emit
const emit = defineEmits(['close']);

// 设置data
const { showMsg } = inject('$utils')
let userForm = reactive(form)       // 表单数据
const rule = ref(rules)             // 表单验证
const ruleFormRef = ref(null)       // form表单的el
const confirmPwdError = ref('')     // 确认密码的错误提示
const options = [                   // 选择身份
  {
    value: 'student',
    label: '学生',
  },
  {
    value: 'teacher',
    label: '教师',
  },
]

/* 设置methods */
// 确认密码验证
function pwdValidate(prop, valid) {
  if(prop === 'confirmPwd') {
    userForm.confirmPwd !== userForm.password && (confirmPwdError.value = "密码不一致")
  }
}
// 提交表单
const submitForm = function (formObj) {
  // 提交验证
  ruleFormRef.value.validate((valid, fields) => {
    console.log(valid);
     if (valid) {
      //  开始注册
      onRegister(formObj).then(res => {
        showMsg.success('注册成功!')
        emit('close')
      }).catch(err => {
        const message = err?.data?.errors[0]?.msg || '注册失败'
        showMsg.err(message)
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 清空表单
const resetForm = function () {
  ruleFormRef.value.resetFields()  // 清空表单验证情况
  Object.keys(userForm).forEach(item => {   // 清空表单内容
    userForm[item] = ''
  })
}
</script>

<style lang="less" scoped>
.demo-userForm {
  width: 100%;
}
.el-input {
  width: 220px;
}
</style>