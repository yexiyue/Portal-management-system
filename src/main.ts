import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { pinia } from './stores'
import Particles from "particles.vue3";
const app = createApp(App)
//如果想在router中使用pinia得写个单独的模块方便引入，后面使用useStore()时传入参数pinia
app.use(pinia)
app.use(router)
//使用粒子库
//@ts-ignore
app.use(Particles)
app.mount('#app')
