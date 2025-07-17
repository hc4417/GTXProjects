import { createWebHistory, createRouter } from 'vue-router'

import Landing from './Landing.vue'
import Form from './Form.vue'
import Profile from './Profile.vue'
import NailCatalog from './NailCatalog.vue'
import Calendar from './Calendar.vue'
import AppointmentTimes from './AppointmentTimes.vue'

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
  { path: '/nail-catalog', component: NailCatalog },
  {
    path: '/calendar',
    component: Calendar,
    children: [
      {
        path: 'appointment/:dateTime',
        name: "apptTimes",
        component: AppointmentTimes
      }
    ]
  },
  {
    path: '/appointment-times',
    component: AppointmentTimes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router