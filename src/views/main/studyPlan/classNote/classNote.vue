<template>
  <div class="edit">
    <pyTableHead item="新增" @itemClick="showRegister=true" edit="批量删除" @editClick="removeItem(chooseStudents)"></pyTableHead>
    <pySearch @search="findData" @input="findData" @clear="widget.search = ''" ></pySearch>
  </div>
  <!-- 表格内容 -->
  <el-table :data="tableData" border size="large" @select="tableSelect" table-layout="auto" highlight-current-row
    :default-sort="{ prop: 'createDate', order: 'descending' }">
    <!-- 选择框 -->
    <el-table-column type="selection" width="55" />
    <!-- 日期 -->
    <el-table-column label="注册日期" prop="createDate" sortable>
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <pyIcon icon="timer"></pyIcon>
          <span style="margin-left: 10px">{{ $utils.formatDate(scope.row.createDate) }}</span>
        </div>
      </template>
    </el-table-column>
    <!-- 班级 -->
    <el-table-column prop="userid" label="学号" />
    <el-table-column prop="username" label="姓名" />
    <el-table-column prop="phone" label="手机号码" />
    <el-table-column prop="profession" label="所属专业"></el-table-column>
    <el-table-column prop="className" label="所属班级"></el-table-column>

    <!-- 操作 -->
    <el-table-column prop="address" label="操作" class="edit">
      <template #default="scope">
        <el-button type="primary" size="small" plain @click="editItem(scope.row)">修改</el-button>
        <el-button type="primary" size="small" plain @click="removeItem([scope.row])">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <PyPagination :total="widget.total" :limit="widget.limit" @currentChange="currentChange"></PyPagination>
  <!-- 编辑信息弹窗 -->
  <pyDialog title="编辑信息" v-if="showDialog" @close="showDialog = false" @confirm="confirm">
    <pyForm ref="pyFormRef" :data="diaFormArr" :rules="register_user" :initData="diaForm"></pyForm>
  </pyDialog>
  <!-- 显示注册弹窗 -->
  <registerVue v-if="showRegister" @close="showRegister=false"></registerVue>
</template>

<script setup>
import { ref, onMounted, inject, reactive, watch } from 'vue'
import pyIcon from '@/components/py/py-icon'
import pySearch from '@/components/py/py-search.vue';
import PyPagination from '@/components/py/py-pagination'
import pyDialog from '@/components/py/py-dialog.vue';
import pyForm from '@/components/py/py-form.vue';
import pyTableHead from '@/components/py/py-tableHead.vue';
import registerVue from '@/components/register.vue';
import { useStore } from 'vuex';
import { register_user } from '@/common/rules'
import { showMsg } from '@/utils/showMsg';

// 设置公共数据
const $http = inject('$http')
const $utils = inject('$utils')
const store = useStore()
const props = defineProps({
  role: String      // 需要请求的数据类型(student, teacher)
})

// 设置data数据
const tableData = ref([])
const userInfo = store.state.userInfo
const widget = reactive({
  pf_id: userInfo.pf_id,
  role: 'student',
  page: 1,
  limit: 10,
  search: ''
})
const showDialog = ref(false)
const diaFormArr = ref([])
const diaForm = ref({})
const pyFormRef = ref(null)
const chooseStudents = ref([])
const showRegister = ref(false)

// methods部署
const getData = () => {   // 获取学生列表
  $http.getUserList(widget).then(res => {
    widget.total = res.data.total
    tableData.value = res.data.list
  }).catch(err => {
    console.log(err);
  })
}

const tableSelect = (select) => {   // 选择table
  chooseStudents.value = select
}

const editItem = (select) => {   // 显示学生信息弹窗
  diaForm.value = select
  diaFormArr.value = [
    {
      label: '学号',
      prop: 'userid',
    },
    {
      label: '姓名',
      prop: 'username',
    },
    {
      label: '手机号码',
      prop: 'phone',
    },
    {
      label: '所属专业',
      prop: 'profession',
    },
    {
      label: '所属班级',
      prop: 'className',
    }
  ]
  showDialog.value = true
}

const confirm = () => {             // 提交表单数据，更新学生信息
  pyFormRef.value.validate(() => {
    const data = pyFormRef.value.formData
    $http.onUpdatedUser(data).then(res => {
      if (res.data.modifiedCount) {
        showMsg.success('修改成功')
        showDialog.value = false
        getData()

      }
    })
  }, () => {
    console.log("表单验证失败");
  })

}

const currentChange = (val) => {    // 分页选择
  widget.page = val
  getData()
}

const findData = (value) => {    // 查询学生
  widget.search = value
  $utils.debounce(getData, 1500)()
}

const removeItem = (select) => { // 删除学生
  const ids = select.map(item => item.userid)
  $utils.el_msgBox('确认删除学生？', () => {
    $http.delUser(ids).then(res => {
      if (res.data.deletedCount) {
        showMsg.success('删除成功')
        chooseStudents.value = []
        getData()   // 更新列表
      }
    })
  })


}

// 组件挂载
onMounted(() => {
  if(props.role) {    // 
    widget.role = props.role
  }
  getData()
})

watch(
   () => widget.search,
   (val) => {
     if(!val) {
       getData()
     }
   },
   { deep: true }
)

</script>

<style lang="less" scoped>
.edit {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
