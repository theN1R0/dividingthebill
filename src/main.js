import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import '@/css/style.sass'
import '@/css/variables.sass'

const app = createApp(App)

app
.use(createPinia())
.use(router)
.use(createVuetify())
.mount('#app')
