import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "normalize.css"
import "./assets/css/index.less"
import 'element-plus/theme-chalk/index.css'
import vue3videoPlay from 'vue3-video-play' // 引入视频播放器组件
import 'vue3-video-play/dist/style.css' // 引入视频播放器css
import apis from '@/service/api'        // 接口
import http from '@/service'            // axios请求
import utils from '@/utils'                // utils下面的工具函数
// console.log(axios);
const app = createApp(App)
app.config.globalProperties.$apis = apis 
app.config.globalProperties.$http = http
app.config.globalProperties.$utils = utils
// 初始化token和menus
store.dispatch("login/initLoginState", "")

app.use(store).use(router).use(vue3videoPlay).mount("#app")
