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
      <!-- <Circle text="Lucros" value="R$ 121230,00" size="250px" :dashSpacing="1/10000" :dashCount="100" :activeCount="30">
      </Circle> -->
      <AlkCircle>
      </AlkCircle>
    </v-card-content>

    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import AlkCircle from "./widgets/AlkCircle.vue";
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
