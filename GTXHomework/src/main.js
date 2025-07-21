import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/jquery/jquery'
import 'fomantic-ui/dist/semantic.css'
import 'fomantic-ui/dist/semantic.js'
import './styles/main.css'

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')