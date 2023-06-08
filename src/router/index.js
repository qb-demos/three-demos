import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: 'beginner',
    children: [
      {
        path: 'beginner',
        name: 'beginner',
        component: () => import('../views/beginner/index.vue'),
        redirect: 'beginner/01',
        children: [
          { path: '01', name: 'beginner-01', component: () => import('../views/beginner/01.vue') },
          { path: 'Primitives', name: 'Primitives', component: () => import('../views/beginner/Primitives.vue') }
        ]
      },
      {
        path: 'intermediate',
        name: 'intermediate',
        component: () => import('../views/intermediate/index.vue'),
        redirect: 'intermediate/01',
        children: [
          { path: '01', name: 'intermediate-01', component: () => import('../views/intermediate/01.vue') }
        ]
      },
      {
        path: 'advanced',
        name: 'advanced',
        component: () => import('../views/advanced/index.vue'),
        redirect: 'advanced/A01',
        children: [
          { path: '01', name: 'advanced-01', component: () => import('../views/advanced/01.vue') }
        ]
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
