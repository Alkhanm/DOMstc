<template>
  <v-card class="mx-auto" density="compact">
    <v-card-title>
      <h4 v-if="sale.description" @click="expand = !expand" style="cursor: pointer;">
        {{ sale.description ? sale.description : saleTitle }}
      </h4>
      <v-spacer></v-spacer>
      {{ formattedDate }}
    </v-card-title>
    <v-card-subtitle class="mb-2">
      {{ sale.canal }}
    </v-card-subtitle>
    <v-expand-transition>
      <div v-show="expand">
        <v-divider></v-divider>
        <v-card-text>
          <p class="more-details-label">
            <strong>Valor da venda R$ </strong> {{ salePrice }}
          </p>
          <p class="more-details-label"><strong>Lucro R$ </strong>{{ salePrice }}</p>
          <p class="more-details-label">
            <strong>Produtos vendidos</strong> {{ productQnt }}
          </p>
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
                  <img
                    class="mt-1 mr-2"
                    width="30"
                    height="30"
                    :src="item.product.imageUrl"
                  />
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
      <v-btn
        variant="text"
        :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="expand = !expand"
      ></v-btn>
      <v-spacer></v-spacer>
      <v-btn>
        <v-icon size="large" class="mr-1">mdi-link</v-icon>
        Detalhes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { ISale } from "../../domain/interfaces/ISale";
import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill";
import { SaleFunctions } from "../../domain/functions/sale-functions";

interface Props {
  sale: ISale;
}
const props = defineProps<Props>();
const expand = ref(false);

const salePrice = computed(() => SaleFunctions.getTotalValue(props.sale.items));
const productQnt = computed(() => {
  return props.sale.items.map(({ quantity }) => quantity).reduce((p, c) => p + c);
});
const formattedDate = computed(() => {
  const plainDate = Temporal.PlainDateTime.from(props.sale.date.toString());
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "full" }).format(plainDate);
});
const saleTitle = computed<string>(() => {
  const items = props.sale.items;
  const size = items.length;
  let title = "";
  if (size >= 1) title = `${title}${items[0].product.description.toUpperCase()}`;
  if (size >= 2) title = `${title}, ${items[1].product.description.toUpperCase()}`;
  if (size >= 3) title = `${title}, ${items[2].product.description.toUpperCase()}`;
  if (size >= 4) title = `${title} e mais ${size - 3}`;
  return title;
});
</script>

<style scoped>
.more-details-label {
  margin-right: 2%;
  margin-bottom: 3px;
  color: rgba(255, 255, 255, 0.856);
}
</style>
