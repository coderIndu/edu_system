import { ElMessage } from 'element-plus'

class ShowMsg {
  init = {
    center: true,
    showClose: true
  }
  err(msg) {
    ElMessage.error({
      message: msg,
      ...this.init
    })
  }
  success(msg) {
    ElMessage({
      type: 'success',
      message: msg,
      ...this.init
    })
  }
  message(msg) {
    ElMessage({
      type: 'message',
      message: msg,
      ...this.init
    })
  }
  waring(msg) {
    ElMessage({
      type: 'waring',
      message: msg,
      ...this.init
    })
  }
}

export default new ShowMsg()