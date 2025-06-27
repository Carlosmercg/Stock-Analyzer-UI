// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import StockList from '../components/StockList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: StockList,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
