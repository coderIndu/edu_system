const modules = require.context('./', true, /\.js$/)
const requsets = {}

modules.keys().forEach(key => {
    Object.assign(requsets, modules(key))
})

export default requsets
// export defalut 