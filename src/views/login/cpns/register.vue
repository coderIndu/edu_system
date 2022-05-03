<template>
  <el-dialog v-model="dialogVisible" @close="close" title="用户修改" width="50%">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rule"
      class="demo-ruleForm"
      label-position="left"
      label-width="80px"
    >
      <el-form-item label="身份" prop="order">
        <el-select v-model="ruleForm.order" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学号" prop="userid">
        <el-input v-model="ruleForm.userid" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="password_confirm">
        <el-input v-model="ruleForm.password_confirm" type="password"/>
      </el-form-item>
      <el-form-item label="专业" prop="class">
        <el-input v-model="ruleForm.profession" />
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-input v-model="ruleForm.class" />
      </el-form-item>

      <!-- 提交表单部分 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
        <el-button @click="resetForm(ruleForm)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, defineEmits, reactive } from 'vue'
import { showMsg } from '@/utils/showMsg'
import { rules, form } from '../config/account-config'
// 获取props
const emit = defineEmits(['close'])
// 是否显示弹窗
const dialogVisible = ref(true)
const rule = ref(rules)   // 表单验证
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

// 关闭弹窗
function close() {
  dialogVisible.value = false
  emit('close', dialogVisible.value)
}

// 提交表单
const submitForm = function () {
  showMsg.success('注册成功')
}

// 清空表单
const resetForm = function () {
  Object.keys(ruleForm).forEach(item => {
    ruleForm[item] = ''
  })
}

</script>

<style lang="less" scoped>
.el-input {
  width: 200px;
}
</style>