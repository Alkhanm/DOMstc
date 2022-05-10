import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ProductNew from "../views/components/ProductNew.vue";
import SaleNew from "../views/components/SaleNew.vue";
import Home from '../views/Home.vue';
import Products from "../views/Products.vue";
import Sale from "../views/Sale.vue";
import Sales from "../views/Sales.vue";
import NotFound from "../views/NotFound.vue"
import { RoutesGuards } from "./route-functions"

const routes: Array<RouteRecordRaw> = [
  {
    name: "Inicio",
    path: "/",
    component: Home,
  },
  {
    name: "Produtos",
    path: "/products",
    component: Products,
  },
  {
    name: "Novo Produto",
    path: "/products/new",
    component: ProductNew
  },
  {
    name: "Venda",
    path: "/sale/:id",
    props: true,
    component: Sale,
  },
  {
    name: "Vendas",
    path: "/sales",
    component: Sales,
  },
  {
    name: "Nova venda",
    path: "/sales/new",
    component: SaleNew,
  },
  {
    name: "Não encontrado",
    path: "/not-found",
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const { notFoundGuard } = RoutesGuards(router);

router.beforeEach(notFoundGuard)

export default router