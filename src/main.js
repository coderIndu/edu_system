import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "normalize.css"
import "./assets/css/index.less"
import 'element-plus/theme-chalk/index.css'
import * as ElIcons from '@element-plus/icons'  // icon
import vue3videoPlay from 'vue3-video-play' 		// 引入视频播放器组件
import 'vue3-video-play/dist/style.css'					// 引入视频播放器css
import request from '@/service/api'
import apis from '@/common/helper'        			// 接口
import utils from '@/utils'                			// utils下面的工具函数
import { validation } from '@/utils/common/custom'			// 自定义指令

const app = createApp(App)

// 全局注册element-icon
for (const name in ElIcons){
	app.component(name, ElIcons[name])
}
// 全局注册属性和方法
app.provide("$apis", apis)
app.provide("$http", request)
app.provide("$utils", utils)

// 注册自定义指令
validation(app)

// 初始化token和menus
store.state.username && store.dispatch("login/initLoginState", "")

app.use(router).use(store).use(vue3videoPlay).mount("#app")
