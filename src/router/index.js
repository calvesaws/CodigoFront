import { createRouter, createWebHistory } from 'vue-router'
import EncryptView from '../views/EncryptView.vue'
import DecryptView from '../views/DecryptView.vue'

const routes = [
  {
    path: '/',
    name: 'encrypt',
    component: EncryptView
  },
  { path: '/decrypt/:id',
  name: 'decrypt-id',
  component: DecryptView
  
},
  {
    path: '/decrypt',
    name: 'decrypt',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: DecryptView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
