const utils = {}
const modules = require.context('../utils', true, /\.js$/)

// 自动注册utils文件夹下面的js文件
modules.keys().forEach(key => {
  Object.assign(utils, modules(key))
})

export default utils