import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: 'three',
        name: 'three',
        component: () => import('../views/three/index.vue')
      },
      {
        path: 'webgl',
        name: 'webgl',
        component: () => import('../views/webgl/index.vue')
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
