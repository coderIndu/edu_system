
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path');
const resolve = function (dir) {
  return path.join(__dirname, '..', dir);
};

module.exports = {
  // 1. 配置方式一：CLI提供的属性
  // outputDir: "build",
  // 2. 配置方式二：和webpack的配置完全一样
  configureWebpack: {
    resolve: {
      extensions: ['.less', '.sass', '.css', '.js', '.vue'],
      alias: {
        "src": "@",
        "cpns": "@/components",
        "views": "@/views",
      },
    },
    plugins: [
      AutoImport({
        resolves: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  },
}
