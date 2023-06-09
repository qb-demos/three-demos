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
          { path: '02', name: 'beginner-02', component: () => import('../views/beginner/02Primitives.vue') },
          { path: '03', name: 'beginner-03', component: () => import('../views/beginner/03SceneGraph.vue') },
          { path: '04', name: 'beginner-04', component: () => import('../views/beginner/04Material.vue') },
          { path: '06', name: 'beginner-05', component: () => import('../views/beginner/05Texture.vue') }
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
