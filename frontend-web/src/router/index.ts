import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RouteStore } from "../store/route-store";
import SaleNew from "../views/components/SaleNew.vue";
import Home from '../views/Home.vue';
import Products from "../views/Products.vue";
import Sale from "../views/Sale.vue";
import Sales from "../views/Sales.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Inicio',
    component: Home
  },
  {
    path: "/products",
    name: "Produtos",
    component: Products
  },
  {
    path: "/sales",
    name: "Vendas",
    component: Sales,
  },
  {
    path: "/sales/:id",
    name: "Venda",
    component: Sale,
  },
  {
    path: "/sale-new",
    name: "Nova Venda",
    component: SaleNew
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  if (to.name) {
    RouteStore.actions.add({ name: to.name.toString(), path: to.fullPath });
  }
})

export default router
