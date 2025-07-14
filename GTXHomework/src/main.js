import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/jquery/jquery'
import './assets/fomantic-ui/semantic.css'
import './assets/fomantic-ui/semantic.js'

import './styles/main.css'

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')