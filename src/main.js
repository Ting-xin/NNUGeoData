import {createApp} from 'vue'
import router from './router'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(router)

app.mount('#app')
