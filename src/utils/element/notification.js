import { ElNotification } from 'element-plus'

export function el_notice(title, message, type) {
  ElNotification({
    title,
    message,
    type,
    duration: 2000
  })
}