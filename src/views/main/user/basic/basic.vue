<template>

  <el-card :body-style="{ padding: '0px' }">
    <el-upload :style="{'pointer-events': isReadonly ? 'none':'' }" class="head-icon" action="" :http-request="uploadIcon" :show-file-list="false">
      <img v-if="formData.image" :src="formData.image" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>

    <div style="padding: 14px;">
      <!-- 表单 -->
      <el-form :model="formData" :rules="isReadonly ? {} : register_user" label-width="80px" ref="formRef">
        <el-form-item class="form-item" v-for="(item, index) in formArr" :key="index" :label="item.label"
          :prop="item.value">
          <el-input :disabled="isReadonly" v-model="formData[item.value]"></el-input>
        </el-form-item>
        <!-- 操作部分 -->
        <el-form-item size="large">
          <el-button v-if="isReadonly" type="primary" size="default" @click="isReadonly = false">修改</el-button>
          <el-button v-else type="primary" size="default" @click="commit">确认</el-button>
          <el-button :disabled="isReadonly" type="danger" size="default" @click="isReadonly = true">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted, reactive, inject } from 'vue'
import { register_user } from '@/common/rules'    // 表单验证配置
import { formArr } from './config'          // form表单配置
import { useStore } from 'vuex'


// 设置公共数据
const store = useStore()
const $http = inject("$http")
const $utils = inject('$utils')
const { showMsg } = $utils
 
// 设置data数据
const userInfo = reactive(store.state.userInfo)
const formData = reactive(userInfo)
const formRef = ref(null)
const isReadonly = ref(true)

// methods部署
const uploadIcon = (source) => {    // 上传头像
  const data = {
    name: source.file.name,
    type: source.file.type,
    lastModifiedDate: source.file.lastModifiedDate,
    size: source.file.size,
    file: source.file,
  }
  
  $http.uploadFile(data).then(res => {
    formData.image = res.data.path
  }).catch(err => {
    console.log(err);
  })

}

// 提交数据
const commit = () => {
  $http.onUpdatedUser(formData).then(res => {
    if(res.data.modifiedCount) {
      showMsg.success('更新成功！')
      store.dispatch('login/updateUserInfo', formData.userid)
      isReadonly.value = true
    }
  }).catch(err => {
    console.log(err);
  })
}
// 组件挂载
onMounted(() => {
  // console.log(userInfo);
})

</script>

<style lang="less" scoped>
.el-card {
  width: 50%;
  padding: 10px;

  /deep/.el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.head-icon {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  justify-content: center;

  /deep/ .el-upload {
    width: 100%;
    height: 100%;

    .avatar-uploader-icon, .avatar {
      width: 100%;
      height: 100%;
    }
  }
}

.form-item {
  margin: 40px 0 !important;
}

.form-item:first-child {
  margin: 0 !important;
}
</style>
