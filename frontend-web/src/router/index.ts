import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SaleNew from "../views/components/SaleNew.vue"
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
  },
  {
    path: "/sales-new",
    component: SaleNew
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
