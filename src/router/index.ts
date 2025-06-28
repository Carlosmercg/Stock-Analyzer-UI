// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import StockList from '../components/StockList.vue'
import CompanyDetail from '../components/CompanyDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: StockList,
  },
  {
    path: '/company/:company',
    name: 'CompanyDetail',
    component: CompanyDetail,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
