import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/css/style.sass'
import '@/css/variables.sass'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
