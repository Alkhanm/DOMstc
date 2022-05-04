<template>
  <v-card class="mx-auto" density="compact">
    <v-card-title>
      <h4 v-if="sale.description" @click="expand = !expand" style="cursor: pointer;">
        {{ sale.description ? sale.description : saleTitle }}
      </h4>
      <v-spacer></v-spacer>
      {{ saleDate }}
    </v-card-title>
    <v-card-subtitle class="mb-2">
      {{ sale.canal }}
    </v-card-subtitle>
    <v-expand-transition>
      <div v-show="expand">
        <v-divider></v-divider>
        <v-card-text>
          <label class="more-details-label">
            <strong>Valor </strong> R$ {{ salePrice }}
          </label>
          <label class="more-details-label"><strong>Lucro </strong> R$ {{ salePrice }}</label>
          <label class="more-details-label">
            <strong>Produtos: </strong> {{ saleProductQnt }}
          </label>
        </v-card-text>
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">Descrição</th>
              <th class="text-left">Categoria</th>
              <th class="text-left">Marca</th>
              <th class="text-left">Fabricante</th>
              <th class="text-center">Quantidade</th>
              <th class="text-right">Preço unitario</th>
            </tr>
          </thead>
          <tbody class="t-body">
            <tr v-for="item in sale.items">
              <td class="text-left">
                <div style="height: 100%; display: flex; align-items: center">
                  <img class="mt-1 mr-2" width="30" height="30" :src="item.product.imageUrl" />
                  {{ item.product.description }}
                </div>
              </td>
              <td class="text-left">{{ item.product.category }}</td>
              <td class="text-left">{{ item.product.brand }}</td>
              <td class="text-left">{{ item.product.company }}</td>
              <td class="text-center">{{ item.quantity }}</td>
              <td class="text-right">R$ {{ item.product.salePrice }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-expand-transition>
    <v-card-actions>
      <v-btn variant="text" :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="expand = !expand"></v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="$router.push(`/sale/${sale.id}`)">
        <v-icon size="large" class="mr-1">mdi-link</v-icon>
        Detalhes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { Intl, Temporal } from "@js-temporal/polyfill";
import { computed, ref } from "vue";
import { ISale } from "../../domain/interfaces/ISale";
import { SaleHooks } from "../../hooks/sale-hooks";

interface Props {
  sale: ISale;
}
const props = defineProps<Props>();
const expand = ref(false);

const sale = computed(() => props.sale);
const { saleTitle, salePrice, saleProductQnt } = SaleHooks.useSaleInfo(sale)
const saleDate = computed(() => {
  const dateISO: string = sale.value ? sale.value.date.toString() : ""
  const plainDate: Temporal.PlainDateTime = Temporal.PlainDateTime.from(dateISO);
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "full" }).format(plainDate);
});

</script>

<style scoped>
.more-details-label {
  margin-right: 2%;
  margin-bottom: 3px;
  color: rgba(255, 255, 255, 0.856);
}
</style>
