<template>
  <div class="container">
    <div class="tag">
      <el-tag class="tag-item" color="#409eff" effect="dark">选择信息</el-tag>
    </div>
    <el-form :model="noticeForm" label-width="120px" :rules="rules" >
      <el-form-item label="班级" prop="class_id" ref="formEl" required>
        <!-- 选择班级 -->
        <el-select v-model="noticeForm.class_id" class="m-2" placeholder="Select">
          <el-option v-for="item in classes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <!-- 选择紧急状态 -->
      <el-form-item label="紧急状态" prop="status">
        <el-select v-model="noticeForm.status" class="m-2" placeholder="Select">
          <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 内容区域 -->
    <div class="tag">
      <el-tag class="tag-item" color="#409eff" effect="dark">公告内容</el-tag>
    </div>
    <el-input type="textarea" v-model="noticeForm.value"></el-input>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, inject } from 'vue'
import { useStore } from 'vuex'

// 设置公共数据
const $http = inject('$http')
const store = useStore()
const rules = {
  class_id: [{required: true, message: "请选择班级", trigger: "blur"}],
  status: [{required: true, message: "请选择状态", trigger: "blur"}],
  value: [{required: true, message: "请输入内容", trigger: "blur"}],
}

// 设置data数据
const formEl = ref(null)
const classes = ref([])
const noticeForm = reactive({
  class_id: "",
  status: "",
  value: ""
})

const status = reactive([{
  label: "普通",
  value: "0"
},
{
  label: "一般紧急",
  value: "1"
},
{
  label: "紧急",
  value: "2"
},
])

// methods部署
const addNotice = () => {
  const profession = store.state.userInfo.profession
  $http.getClassList(profession).then(res => {
    classes.value = res.data.map(item => {
      return {
        label: item.name,
        value: item.id
      }
    })
  })
}

// 组件挂载
onMounted(() => {
  addNotice()
})

defineExpose(noticeForm)
</script>

<style lang="less" scoped>
.tag-item {
  height: 30px;
  margin: 10px 0;
}

/deep/ .el-textarea__inner {
  width: 100%;
  height: 300px;
}
</style>
