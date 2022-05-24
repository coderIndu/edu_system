
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
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    // open: true,
    proxy: {
      '/api': {         // axios请求跨域
        // target: 'http://114.132.229.173:5000/api',
        target: 'http://127.0.0.1:5000/api',
        ws: true,
        changeOrigin:true,//允许跨域
        pathRewrite: {
          '/api': ""
        }
      },
      '/resource': {    // 请求资源跨域
        // target: 'http://114.132.229.173:5000/api/resource/',
        target: 'http://127.0.0.1:5000/api/resource/',
        ws: true,
        changeOrigin:true,//允许跨域
        pathRewrite: {
          '/resource': ""
        }
      }
    }
  }
}
