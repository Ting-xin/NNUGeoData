import {createApp} from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from '@/App.vue'

const app = createApp(App)
app.use(Element)
