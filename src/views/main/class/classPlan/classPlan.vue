<template>
  <div class="classplan">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="序号" width="180" />
      <el-table-column prop="name" label="课程名称" width="180" />
      <el-table-column prop="address" label="课程内容"></el-table-column>
      <el-table-column prop="address" label="操作" class="edit">
        <el-button type="primary" @click="showDialog" size="small" plain>上传资源</el-button>
        <el-button type="danger" size="small" plain>删除</el-button>
      </el-table-column>
    </el-table>

    <UpDialog v-if="isshow" @close="isshow = false"></UpDialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, onMounted } from 'vue'
import UpDialog from '@/components/common/up-dialog'
 
const { proxy } = getCurrentInstance()  // 获取全局属性或方法
const { $http, $apis, $utils: {showMsg} } = proxy  

const tableData = [
  {
    date: "1",
    name: "计算机导论",
    address: "计算机导论.pdf",
  },
  {
    date: "2",
    name: "软件测试",
    address: "软件测试.pdf",
  },
  {
    date: "3",
    name: "javascript",
    address: "javascript.pdf",
  },
  {
    date: "4",
    name: "测试",
    address: "测试.text",
  },
];

// 上传部分
const handleChange = async (source) => {
  console.log(source);
  let para = {
    name: source.file.name,
    type: source.file.type,
    lastModifiedDate: source.file.lastModifiedDate,
    size: source.file.size,
    file: source.file
  }
  const res = await $http.post($apis.uploadFile, para, 'formData')
  console.log(res);
  // if(res.data.status === 200) {  // 上传成功
  //   showMsg.success('上传成功')
  // } else {
  //   showMsg.err('网络异常，请重试')
  // }
}

// 上传弹窗部分
const isshow = ref(false)
const showDialog = () => {
  isshow.value = true
}

</script>

<style lang="less" scoped>
.classplan {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #f6f6f6;

  /deep/.cell {
    display: flex;

    .upload-demo {
      margin-right: 1.25rem;
    }
  }
  
}
</style>
