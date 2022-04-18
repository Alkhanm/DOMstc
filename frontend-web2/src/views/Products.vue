<template>
  <v-container fluid class="flex" style="height: 100%">
    <v-card class="mx-auto">
      <v-card-header class="center">Produtos cadastrados</v-card-header>
      <v-card-actions>
        <v-btn class="mr-2">
          <v-icon class="ma-1">mdi-filter</v-icon>
          Filtrar
        </v-btn>
        <v-btn>
          <v-icon class="ma-1">mdi-reorder-horizontal</v-icon>
          Ordenar
        </v-btn>
        <v-spacer></v-spacer>
        <product-new></product-new>
      </v-card-actions>
    </v-card>
    <section class="products">
      <v-table class="mt-2 w-100">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th class="text-left">Código</th>
            <th class="text-left">Nome</th>
            <th class="text-left">Categoria</th>
            <th class="text-left">Marca</th>
            <th class="text-left">Empresa</th>
            <th class="text-left">Preço de venda</th>
            <th class="text-left">Quantidade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>
              <v-checkbox direction="horizontal" width="10" density="compact" />
            </td>
            <td>
              <img class="ma-1" width="50" height="50" :src="product.imageUrl" />
            </td>
            <td>{{ product.code }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.brand }}</td>
            <td>{{ product.company }}</td>
            <td>R$ {{ product.salePrice }}</td>
            <td>{{ product.quantity }}</td>
            <td class="ma-0 pa-0" width="140">
              <v-btn variant="text" width="50" class="mr-2">
                <v-icon size="large" :color="COLORS.BLUE.lighten"
                  >mdi-link-variant</v-icon
                >
              </v-btn>
              <v-btn variant="text" width="50" class="">
                <v-icon size="large" :color="COLORS.RED.lighten">mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </section>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import * as COLORS from "../colors";
import { ProductHttp } from "../domain/api/ProductsHtpp";
import { ProductStore } from "../store/product-store";
import ProductNew from "./components/ProductNew.vue";

const products = computed(() => ProductStore.state.list);

onMounted(async () => {
  const data = await ProductHttp.fetch();
  ProductStore.actions.addAll(data);
});
</script>

<style>
.products {
  display: flex;
  width: 100%;
  height: 88%;
}
input {
  size: 100px;
}
</style>
