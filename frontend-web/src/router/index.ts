import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RouteStore } from "../store/route-store";
import SaleNew from "../views/components/SaleNew.vue";
import Home from '../views/Home.vue';
import Products from "../views/Products.vue";
import Sale from "../views/Sale.vue";
import Sales from "../views/Sales.vue";

function getValues(obj: object, route: string, path = "") {
  Object.values(obj).forEach((value) => {
    if (value["name"] === route) {
      return `${path}`;
    }
    if (typeof value === "object") {
      getValues(value, route, path.length ? path + " - " + value["name"] : value["name"]);
    }
  });
}

export const ROUTES_NAMES = {
  HOME: {
    name: "Inicio",
    path: "/"
  },
  SALES: {
    name: "Vendas",
    path: "/sales",
    NEW: {
      name: "Nova Venda",
      path: "/sales/new"
    },
    SALE: {
      name: "Venda",
      path: "/sales/:id"
    },
  },
  PRODUCTS: {
    name: "Produtos",
    path: "/products"
  },
};

const { HOME, PRODUCTS, SALES } = ROUTES_NAMES;

const routes: Array<RouteRecordRaw> = [
  {
    name: HOME.name,
    path: HOME.path,
    component: Home
  },
  {
    name: PRODUCTS.name,
    path: PRODUCTS.path,
    component: Products
  },
  {
    name: SALES.name,
    path: SALES.path,
    component: Sales

  },
  {
    name: SALES.NEW.name,
    path: SALES.NEW.path,
    component: SaleNew
  },
  {
    name: SALES.SALE.name,
    path: SALES.SALE.path,
    component: Sale,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  if (to.name){
    getValues(ROUTES_NAMES, to.name.toString());
    console.log(arrResult)
  }
})

export default router
