import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "normalize.css"
import "./assets/css/index.less"
import 'element-plus/theme-chalk/index.css'
import * as ElIcons from '@element-plus/icons'  // icon
import vue3videoPlay from 'vue3-video-play' // 引入视频播放器组件
import 'vue3-video-play/dist/style.css' // 引入视频播放器css
import apis from '@/service/api'        // 接口
import http from '@/service'            // axios请求
import utils from '@/utils'                // utils下面的工具函数
// console.log(axios);
const app = createApp(App)

// 全局注册element-icon
for (const name in ElIcons){
	app.component(name, ElIcons[name])
}
// 全局注册属性和方法
app.provide("$apis", apis)
app.provide("$http", http)
app.provide("$utils", utils)

// 初始化token和menus
store.dispatch("login/initLoginState", "")

app.use(store).use(router).use(vue3videoPlay).mount("#app")
