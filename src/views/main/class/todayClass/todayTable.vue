<template>
  <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="序号" />
      <el-table-column prop="name" label="班级" />
      <el-table-column prop="class" label="课程">
        <el-select v-model="value" class="m-2" :placeholder="options[0].label" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-table-column>
      <el-table-column prop="date" label="打卡情况">
        <span :style="{'color':isSign?'#95d475':'#f00'}">{{ isSign ? '已打卡' : '未打卡' }}</span>
      </el-table-column>
      <el-table-column prop="date" label="操作">
        <template #default="scope">
          <el-button type="danger" :disabled="isSign" @click="handleEdit(scope.row)">打卡</el-button>
          <el-button type="danger" :disabled="isSign" @click="learnClass()">学习</el-button>
        </template>
      </el-table-column>
  </el-table>

  <!-- 打卡弹窗 -->
  <el-dialog v-model="dialogVisible" title="Tips" width="30%" >
    <span>确定打卡？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="isSign = true;dialogVisible=false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['showPage'])

let isSign = ref(false)
let dialogVisible = ref(false)

const tableData = [
  {
    date: '1',
    name: '1班',
    class: '计算机导论',
  },
  // {
  //   date: '2',
  //   name: '软件测试',
  //   address: '软件测试.pdf',
  // },
  // {
  //   date: '3',
  //   name: 'javascript',
  //   address: 'javascript.pdf',
  // },
  // {
  //   date: '4',
  //   name: '测试',
  //   address: '测试.text',
  // },
]

const options = [
  {
    value: 'Option1',
    label: '计算机导论',
  },
  {
    value: 'Option2',
    label: '软件测试',
  },
  {
    value: 'Option3',
    label: 'javascript',
  },
  {
    value: 'Option4',
    label: '测试',
  },
]
let value = ref(options[0].label)

// 打卡
const handleEdit = function (row) {
  // this.isSign = true
  this.dialogVisible = true
}

// 学习课程
const className = ref('')
function learnClass() {
  className.value = value.value
  emit('showPage', className.value)
  router.push({
    path: '/main/class/todayClass',
    query: {
      className: value.value
    }
  })
}  

</script>

<style lang="less" scoped>

</style>