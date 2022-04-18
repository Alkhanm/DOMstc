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
        <v-btn>
          <v-icon>mdi-database-plus</v-icon>
          Novo
        </v-btn>
      </v-card-actions>
    </v-card>
    <section class="products">
      <product-card :product="product" > </product-card>
    </section>
  </v-container>
</template>

<script lang="ts">
import { onBeforeMount, ref } from "vue";
import { ProductHttp } from "../domain/api/ProductsHtpp";
import ProductCard from "./components/ProductCard.vue";

export default {
  components: { ProductCard },

  setup() {
    const product = ref();

    onBeforeMount(async () => {
      const result = await ProductHttp.fetchOne(1);
      product.value = result
    });

    return {
      product,
    };
  },
};
</script>

<style>
.products {
  display: flex;
  height: 88%;
}
</style>
