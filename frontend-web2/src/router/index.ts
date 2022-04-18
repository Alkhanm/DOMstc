import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Products from "../views/Products.vue"
import Sales from "../views/Sales.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: "/products",
    name: "products",
    component: Products
  },
  {
    path: "/sales",
    name: "sales",
    component: Sales
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
