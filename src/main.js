import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "normalize.css"
import "./assets/css/index.less"
import 'element-plus/theme-chalk/index.css'
import message from './utils/showMsg'

const app = createApp(App)

store.dispatch("login/initLoginState", "")

app.provide('message', message)
app.use(store).use(router).mount("#app")
