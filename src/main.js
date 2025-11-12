import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupIdleLogout } from './composables/idleLogout'

import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

axios.defaults.baseURL = 'https://mlyrmdhnn.my.id/taskflow/api/'

app.use(createPinia())
app.use(router)
setupIdleLogout()

app.mount('#app')
