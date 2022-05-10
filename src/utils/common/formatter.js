/**
 * 格式化日期 
 * @param {*} date 日期
 * @returns 
 */
export function formatDate(date) {
  let newDate = new Date(date)

  let year = newDate.getFullYear()
  let month = newDate.getMonth() + 1
  let day = newDate.getDate()
  let hour = formatZero(newDate.getHours())
  let min = formatZero(newDate.getMinutes())
  let s = formatZero(newDate.getSeconds())
  return `${year}-${month}-${day} ${hour}:${min}:${s}`
}

/**
 * 格式化 1 -> 01 10 -> 10 (小于10的数加上0)
 * @param {*} count 数字
 * @returns 
 */
export function formatZero(count) {
  return ("00" + count).slice(-2)
}

/**
 * 数组去重
 * @param {Array} arr 数组
 * @returns 
 */
export function formatDedup(arr) {
  return [...new Set([...arr])]
}


/**
 * 序列化对象为query格式
 * @param {*} source 被序列化的数据，一般用于get请求
 * @returns 
 */
export function parseParams(source) {
  try {
    var temps = []
    for(let i in source) {
      var key = i
      var value = source[i]
      if ( typeof(source[i]) == 'object') value = JSON.stringify(value)
      temps.push(`${key}=${value}`)
    }
    return temps.join('&')
  } catch (err) {
    return ''
  }
}


/**
 * 格式化文件大小
 * @param {Number} size 大小
 * @returns 
 */
export function formatSize(size) {
  let count = Math.pow(1024, 2)
  if(size > count) {
    return parseFloat(size / count).toFixed(2) + 'M'
  }
  return parseFloat(size / 1024).toFixed(2) + 'KB'
}