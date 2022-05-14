import http from "@/service"
import helper from '@/common/helper'			
import { Base64 } from 'js-base64';
import { PRIVIEW_URL } from "@/service/request/config";

export function downloadByBlob(url, name) {
  let image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.src = url
  image.onload = () => {
    let canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    let ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, image.width, image.height)
    canvas.toBlob((blob) => {
      let url = URL.createObjectURL(blob)
      downloadFile(url, name)
      // 用完释放URL对象
      URL.revokeObjectURL(url)
    })
  }
}

export function downloadFile(href, name) {
  http.get(href, {}, 'blob').then(res => {
    // console.log(111, res);
    const blob = new Blob([res.data])
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = URL.createObjectURL(blob);

    // 保存下来的文件名
    a.download = name;
    document.body.appendChild(a);
    a.click();
    // 移除元素
    document.body.removeChild(a);
  })
}

export function priviewFile(url) {
  url = PRIVIEW_URL + url
  console.log(url);
  let priview = `${helper.previewHost}?url=${encodeURIComponent(Base64.encode(url))}`
  window.open(priview)
}
