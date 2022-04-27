import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SaleNew from "../views/components/SaleNew.vue";
import Home from '../views/Home.vue';
import Products from "../views/Products.vue";
import Sale from "../views/Sale.vue";
import Sales from "../views/Sales.vue";

const routes: Array<RouteRecordRaw> = [
  {
    name: "Inicio",
    path: "/",
    component: Home,
    meta: {
      back: () => (undefined)
    }
  },
  {
    name: "Produtos",
    path: "/products",
    component: Products,
    meta: {
      back: () => (undefined)
    }
  },
  {
    name: "Vendas",
    path: "/sales",
    component: Sales,
    meta: {
      back: () => (undefined)
    }
  },
  {
    name: "Nova venda",
    path: "/sales/new",
    component: SaleNew,
    meta: {
      back: () => (router.push("/sales"))
    }
  },
  {
    name: "Venda",
    path: "/sale",
    props: true,
    component: Sale,
    meta: {
      back: () => (router.push("/sales"))
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
