<template>
  <v-card density="compact" class="card">
    <v-card-title style="display: flex; width: 100%; justify-content: center;">
      <h3>{{ saleTitle.toUpperCase() }}</h3>
    </v-card-title>
    <v-card-text style="flex: 1">
      <div style="display: flex; margin-top: 10px; ">
        <CardInfo text="Valor" :value="`R$ ${salePrice}`" icon="mdi-cash-multiple" />
        <v-spacer></v-spacer>
        <CardInfo text="Canal" :value="sale?.canal" icon="mdi-store" />
        <v-spacer></v-spacer>
        <CardInfo text="Produtos" :value="`${saleProductQnt} / ${sale?.items.length}`" icon="mdi-shopping" />
        <v-spacer></v-spacer>
        <CardInfo text="Data" :value="saleDate" icon="mdi-calendar" />
      </div>
    </v-card-text>
    <v-card-content style="flex: 5">
      <v-table fixed-header>
        <thead>
          <tr>
            <th>
              <v-card-title> Produtos </v-card-title>
            </th>
            <th class="text-left">Descrição</th>
            <th class="text-center">Quantidade</th>
            <th class="text-right">Preço unitario</th>
            <th class="text-right">Valor total</th>
          </tr>
        </thead>
        <tbody class="t-body">
          <tr v-for="item in sale?.items">
            <td>
              <img class="mt-2" width="40" height="40" :src="item.product.imageUrl" />
            </td>
            <td>{{ item.product.description }}</td>
            <td class="text-center">{{ item.quantity }}</td>
            <td class="text-right">R$ {{ item.product.salePrice }}</td>
            <td class="text-right">
              R$ {{ item.product.salePrice * item.quantity }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-content>
    <FloatingActions>
      <div>
        <v-btn @click="$router.back()" variant="text" block>
          <v-icon class="mr-1" size="large">mdi-keyboard-return</v-icon>
          Voltar
        </v-btn>
      </div>
      <v-divider vertical></v-divider>
      <div>
        <v-btn variant="text" block>
          <v-icon class="mr-1" size="large">mdi-clipboard-edit-outline</v-icon>
          Editar
        </v-btn>
      </div>
      <v-divider vertical></v-divider>
      <div>
        <v-btn variant="text" block>
          <v-icon class="mr-1" size="large">mdi-delete</v-icon>
          Excluir
        </v-btn>
      </div>
    </FloatingActions>

  </v-card>
</template>

<script setup lang="ts">
import { Intl, Temporal } from "@js-temporal/polyfill";
import { computed, onBeforeMount } from "vue";
import { RouteParams } from "vue-router";
import { ISale } from "../domain/interfaces/ISale";
import { SaleHooks } from "../hooks/sale-hooks";
import router from "../router";
import { SaleStore } from "../store/sale-store";
import FloatingActions from "./components/FloatingActions.vue";
import CardInfo from "./widgets/CardInfo.vue";

const params: RouteParams = router.currentRoute.value.params;
const id: number = parseInt(params.id as string);

const sales = computed<ISale[]>(() => SaleStore.state.list);
const sale = computed<ISale>(() => sales.value.find(s => s.id == id)!);
const { salePrice, saleProductQnt, saleTitle } = SaleHooks.useSaleInfo(sale)

const saleDate = computed(() => {
  if (!sale.value) return;
  const dateISO: string = sale.value.date.toString();
  const plainDate: Temporal.PlainDateTime = Temporal.PlainDateTime.from(dateISO);
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(plainDate);
});

onBeforeMount(async () => {
  if (!sale.value) await SaleStore.actions.fetchAll()
})

</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}
</style>
