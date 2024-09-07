import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import '@/style/index.scss'
import * as ECharts from 'echarts'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from './stores/counter.ts'
import { OpenAPI } from '../generated'
const app = createApp(App)
app.config.globalProperties.$ECharts = ECharts
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const token = localStorage.getItem('token')
if (token) {
  OpenAPI.TOKEN = token
}
