import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: 'helloThree',
        name: 'helloThree',
        component: () => import('../views/three/index.vue')
      },
      {
        path: 'Primitives',
        name: 'Primitives',
        component: () => import('../views/three/Primitives.vue')
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
