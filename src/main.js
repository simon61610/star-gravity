// import './assets/main.css'
import './assets/styles/main.scss'

import '@/composables/useAuth'  // 存token(會員中心)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//element plus 引入
import ElementPlus from 'element-plus'             // 元件邏輯
import 'element-plus/dist/index.css'               // 樣式檔

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
