<template>
  <v-card class="product-card d-flex mx-auto ma-2 pa-2" width="100%" max-height="150">
    <v-img
      class="align-end text-white"
      height="100"
      width="100"
      :src="product.imageUrl"
      cover
    >
    </v-img>
    <v-card-title class="product-title">{{product.description}}</v-card-title>
    <v-card-subtitle class="subtitle">{{product.company}}</v-card-subtitle>
    <v-card-subtitle class="subtitle">{{product.category}}</v-card-subtitle>
    <v-card-text>
      <div>{{product.code}}</div>
      <div>{{product.quantity}}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange"> Detalhes </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { IProduct } from "../../domain/interfaces/IProduct";

interface Props {
    product: IProduct
}
const props = defineProps<Props>()

</script>

<style scoped>
.product-card{
    align-items: center;
    justify-content: center;
}
.product-title {
  max-width: 150px;
}
</style>
