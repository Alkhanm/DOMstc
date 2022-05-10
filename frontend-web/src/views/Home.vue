<template>
    <v-card density="compact" class="card">
        <v-card-header style="display: flex; justify-content: space-around">
            <PageCard title="Produtos" link="/products" icon="mdi-cart" />
            <PageCard title="Vendas" link="/sales" icon="mdi-cart-arrow-down" />
            <PageCard title="Anuncios" link="/adverts" icon="mdi-archive" />
            <PageCard title="Vendas Fiadas" link="/short-sales" icon="mdi-handshake" />
        </v-card-header>
        <v-divider></v-divider>
        <v-card-title class="d-flex justify-center w-100">Bem vindo!</v-card-title>
        <v-card-text style="display: flex; justify-content: space-around;">
            <CardInfoText text="Vendas realizadas" :value="10" />
            <CardInfoText text="Novos produtos" :value="10" />
            <CardInfoText text="Novos anúncios" :value="10" />
            <CardInfoText text="Produtos s/ estoque" :value="10" />
        </v-card-text>
        <v-card-actions> </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
import PageCard from "./widgets/PageCard.vue";
import CardInfoText from "./widgets/CardInfoText.vue";
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
}
</style>
