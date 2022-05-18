import { ElMessageBox } from 'element-plus'
import { showMsg } from '../showMsg'

export function el_msgBox(title, fn) {
  ElMessageBox.confirm(
    title,
    '删除操作',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
      roundButton: true
    }
  )
    .then(() => {
      fn()
    })
    .catch(() => {
      showMsg.info('取消操作')
    })
}