<template>
  <el-dialog v-model="dialogFormVisible" title="新建课程" width="30%" @close="close">
    <el-form :model="formData">
      <el-row>
        <!-- 选择班级 -->
        <el-col :span="12">
          <el-form-item label="班级" width="100%">
            <el-select placeholder="选择班级" v-model="formData.class_id" clearable ref="selectRef">
              <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 课程名称 -->
        <el-col :span="12"> 
          <el-form-item label="课程名称">
            <el-input v-model="formData.course_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { form } from '@/views/login/config/account-config';
import { ref, onMounted, inject, reactive } from 'vue'
import { useStore } from 'vuex'

// 设置公共数据
const $http = inject('$http')
const { showMsg } = inject('$utils')
const store = useStore()
const emits = defineEmits(['close', 'confirm'])

// 设置data数据
const selectRef = ref(null)
const dialogFormVisible = ref(true)             // 是否显示弹窗
const options = ref([])                         // 班级下拉框
const { profession, userid } = store.state.userInfo     // 用户专业信息
const formData = reactive({
  course_name: "",
  class_id: ""
})


// methods部署
function getData() {       // 获取班级列表
  $http.getClassList(profession).then(res => {
    options.value = res.data.map(item => {
      return {
        label: item.name,
        value: item.id,
      }
    })
  })
}


function confirm() {       // 提交表单
  const data = {
    id: new Date().getTime(),
    name: formData.course_name,
    create_id: userid,
    class_name: selectRef.value.selectedLabel,
    class_id: formData.class_id
  }

  $http.addCourse(data).then(res => {
    if(res.status === 200) {
      showMsg.success('添加成功！')
      dialogFormVisible.value = false
      emits('confirm')
    }
  }).catch(err => {
    showMsg.err(err)
  }) 
}

function close() {
  dialogFormVisible.value = false
  emits('close')
}

// 组件挂载
onMounted(() => {
  getData()
})

</script>

<style lang="scss" scoped>

</style>
