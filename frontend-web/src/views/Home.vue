<template>
  <v-card density="compact" class="card">
    <v-card-header style="display: flex; justify-content: space-around">
      <PageCard title="Produtos" link="/products" icon="mdi-cart" />
      <PageCard title="Vendas" link="/sales" icon="mdi-cart-arrow-down" />
      <PageCard title="Anuncios" link="/adverts" icon="mdi-archive" />
      <PageCard title="Vendas Fiadas" link="/short-sales" icon="mdi-handshake" />
    </v-card-header>
    <v-divider></v-divider>
    <v-card-title class="d-flex justify-center w-100">
      <v-card-text style="display: flex; justify-content: space-around">
        <CardInfoText text="Vendas feitas" :value="10" />
        <CardInfoText text="Anúncios Realizados" :value="10" />
        <CardInfoText text="Produtos s/ estoque" :value="10" />
      </v-card-text>
    </v-card-title>
    <v-card-content style="display: flex; justify-content: center; align-items: center">
      <v-progress-circular
        size="200"
        model-value="80"
        width="15"
        color="deep-orange lighten-2"
      >
        <p>Lucro</p><br>
        <p>15%</p>
      </v-progress-circular>
    </v-card-content>

    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import CardInfoText from "./widgets/CardInfoText.vue";
import PageCard from "./widgets/PageCard.vue";
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}
</style>
