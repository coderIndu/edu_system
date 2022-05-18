import { ElMessage } from 'element-plus'

const init = {
  center: true,
  showClose: true,
  duration: 1000
}

export const showMsg = {
  err(msg) {
    ElMessage.error({
      message: msg,
      ...init
    })
  },
  success(msg) {
    ElMessage({
      type: 'success',
      message: msg,
      ...init
    })
  },
  info(msg) {
    ElMessage({
      type: 'info',
      message: msg,
      ...init
    })
  },
  waring(msg) {
    ElMessage({
      type: 'waring',
      message: msg,
      ...init
    })
  }
}

