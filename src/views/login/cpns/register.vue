<!-- 注册页面组件 -->
<template>
  <el-dialog :model-value="true" @close="emit('close')" title="用户修改" top="25vh" width="40%">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rule"
      class="demo-ruleForm"
      label-position="center"
      label-width="100px"
    > 
      <el-row justify="space-between">
        <!-- 身份 -->
        <el-col :span="12">  
          <el-form-item label="身份" prop="role">
            <el-select v-model="ruleForm.role" class="m-2" placeholder="Select" size="large">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 学号 -->
        <el-col :span="12">
          <el-form-item label="学号" prop="userid">
            <el-input v-model="ruleForm.userid" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row justify="space-between">
          <!-- 姓名 -->
        <el-col :span="12"> 
          <el-form-item label="姓名" prop="username">
            <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <!-- 密码 -->
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"/>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row justify="space-between">
       <!-- 确认密码 -->
        <el-col :span="12">
          <el-form-item label="确认密码" prop="password_confirm">
            <el-input v-model="ruleForm.password_confirm" type="password"/>
          </el-form-item>
        </el-col>
         <!-- 专业 -->
        <el-col :span="12">
          <el-form-item label="专业" prop="profession">
            <el-input v-model="ruleForm.profession" />
          </el-form-item>
        </el-col>
        <!-- 班级 -->
        <el-col :span="12">
          <el-form-item label="班级" prop="class">
            <el-input v-model="ruleForm.class" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交表单部分 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
        <el-button @click="resetForm(ruleForm)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, defineEmits, reactive, getCurrentInstance, inject } from 'vue'
import { rules, form } from '../config/account-config'
import { onRegister } from '@/service/login'

// 设置emit
const emit = defineEmits(['close']);

// 获取全局变量属性
const {showMsg} = inject('$utils')



const rule = ref(rules)   // 表单验证
const ruleFormRef = ref(null) // form表单的el
let ruleForm = reactive(form)  // 表单数据
// 选择身份
const options = [
  {
    value: 'student',
    label: '学生',
  },
  {
    value: 'teacher',
    label: '教师',
  },
]

// 提交表单
const submitForm = function (formObj) {
  // showMsg.success('注册成功')
  // console.log(onRegister);
  ruleFormRef.value.validate((valid, fields) => {
     if (valid) {
      console.log('submit!', formObj)

      onRegister(formObj).then(res => {
        // console.log(res);
        showMsg.success('注册成功!')
        emit('close')
      }).catch(err => {
        let errMsg = err.data?.errors[0].msg ?? '注册失败!'
        showMsg.err(errMsg)
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 清空表单
const resetForm = function () {
  ruleFormRef.value.resetFields()  // 清空表单验证情况
  Object.keys(ruleForm).forEach(item => {   // 清空表单内容
    ruleForm[item] = ''
  })

}
</script>

<style lang="less" scoped>
.demo-ruleForm {
  width: 100%;
}
.el-input {
  width: 220px;
}
</style>