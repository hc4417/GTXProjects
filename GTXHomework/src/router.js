import { createWebHistory, createRouter } from 'vue-router'

import Landing from './Landing.vue'
import Form from './Form.vue'
import Profile from './Profile.vue'

const routes = [
  {
    path: '/',
    component: Landing,
    children: [
      {
        path: 'loggedIn-profile',
        component: Profile,
      }
    ]
  },
  { path: '/form', component: Form },
  { path: '/profile', component: Profile },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router