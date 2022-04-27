<template>home</template>

<script lang="ts" setup>
interface AppRoute {
  name: string;
}

const ROUTES_NAMES = {
  name: {
    name: "Inicio",
  },
  SALES: {
    name: "Vendas",
    NEW: {
      name: "Nova Venda",
    },
    SALE: {
      name: "Venda",
    },
  },
  PRODUCTS: {
    name: "Produtos",
  },
};
/*
function getValues(objValues: any[], route: string, path = "") {
  const newObjValues: any[] = [];
  objValues.forEach((value) => {
    if (value["name"] === route) {
      console.log(path, "-", route);
      return;
    }
    if (typeof value === "object") {
      getValues(Object.values(value), route, path + " - " + value["name"]);
    }
    if (!newObjValues.length) return;
  });

  function getValues(obj: object, route: string, path = "") {
  const arr: any[] = []  
  Object.values(obj).forEach((value) => {
    if (value["name"] === route) {
      console.log(path, "-", route);
      return;
    }
    if (typeof value === "object") {
      getValues(value, route, path + " - " + value["name"]);
    }
  });
}
} */

</script>
