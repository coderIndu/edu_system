<template>
  <el-dialog v-model="dialogVisible" @close="close" title="用户修改" width="40%">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      class="demo-ruleForm"
      label-position="left"
      label-width="80px"
    >
      <el-form-item label="身份" prop="order">
        <el-select v-model="value" class="m-2" placeholder="Select" size="large">
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
        <el-input v-model.number="ruleForm.password" type="password"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="password_confirm">
        <el-input v-model.number="ruleForm.password_confirm" type="password"/>
      </el-form-item>
      <el-form-item label="专业/班级" prop="class">
        <el-input v-model.number="ruleForm.class" />
      </el-form-item>

      <!-- 提交表单部分 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ElForm, ElFormItem, ElDialog, ElInput, ElButton, ElSelect, ElOption } from 'element-plus'
import { ref, defineEmits, watch, reactive } from 'vue'
import { showMsg } from '@/utils/showMsg'
// 获取props
const emit = defineEmits(['close'])
// 是否显示跳窗
const dialogVisible = ref(true)

function close() {
  dialogVisible.value = false
  emit('close', dialogVisible.value)
}

const ruleForm = reactive({
  order: '学生',
  userid: '20188888',
  username: '蒋锋',
  password: '123321',
  password_confirm: '123321',
  class: '1班'
})
// const rules = reactive({
//   pass: [{ validator: validatePass, trigger: 'blur' }],
//   checkPass: [{ validator: validatePass2, trigger: 'blur' }],
//   age: [{ validator: checkAge, trigger: 'blur' }],
// })
const submitForm = function () {
  showMsg.success('注册成功')
}

const resetForm = function () {

}

// 
const value = ref('')
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
</script>

<style lang="less" scoped>
</style>