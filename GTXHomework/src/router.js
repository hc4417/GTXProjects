import { createWebHistory, createRouter } from 'vue-router'

import Landing from './Landing.vue'
import Form from './Form.vue'

const routes = [
  { path: '/', component: Landing },
  { path: '/form', component: Form },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router