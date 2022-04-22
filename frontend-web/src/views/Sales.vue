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
                <v-btn dark @click.stop="$router.push('/sales-new')">
                    <v-icon class="ma-1">mdi-database-plus</v-icon>
                    Novo
                </v-btn>
                <v-menu transition="none" close-on-hover>
                    <template v-slot:activator="{ props, isActive }">
                        <v-btn class="ml-2" :="props">
                            <v-icon class="ma-1"> mdi-tune </v-icon>
                            Ações
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item>
                            <v-list-item-icon class="mr-1" size="small">mdi-delete</v-list-item-icon>
                            <v-list-item-title>Excluir</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-card-actions>
        </v-card>
        <section class="mt-2" v-for="sale in sales">
            <SaleCard :sale="sale" />
        </section>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ISale } from "../domain/interfaces/ISale";
import { SaleStore } from "../store/sale-store";
import SaleCard from "./components/SaleCard.vue";

const sales = ref<ISale[]>(SaleStore.state.list);
</script>
