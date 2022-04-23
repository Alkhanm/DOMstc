<template>
  <v-container fluid class="h-100">
    <v-card density="compact" style="height: 100%;">
      <v-card-title class="d-flex justify-center">
        <span>Nova Venda</span>
      </v-card-title>
      <v-card-content style="display: flex; flex-grow: 1; justify-content: center;;">
        <v-form style="max-width: 1000px; width: 100%" ref="form">
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Descrição da venda (opcional)" hint="Nome/descrião da venda" />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select label="Canal da venda" :items="Object.values(eSaleCanal)"
                hint="Plataforma na qual a venda ocorreu (Ex: Shoppee, Amazon, Mercado Livre, etc)" required></v-select>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card class="mx-auto h-flex" variant="text" density="compact">
            <v-card-title>
              <h5>Pesquisar produto(s)</h5>
            </v-card-title>
            <v-autocomplete v-model="productQuery" :items="productsDescription" prepend-icon="mdi-cart"
              label="Pesquisar produto(s)" clearable no-data-text="Não há produtos no estoque" />
            <SaleItemCard @on-add="add" v-if="itemSelected" :item="itemSelected" />
            <v-divider class="mt-5"></v-divider>

            <v-table v-if="itemsCart.length" height="250px" fixed-header fixed-footer>
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
                <tr @click="itemSelected = ItemFunctions.copy(item)"
                  :class="item.product.id == itemSelected?.product.id ? 'selected-row' : ''" style="cursor: pointer;"
                  v-for="item in itemsCart">
                  <td>
                    <img class="mt-2" width="40" height="40" :src="item.product.imageUrl" />
                  </td>
                  <td>{{ item.product.description }}</td>
                  <td class="text-center">{{ item.quantity }}</td>
                  <td class="text-right">R$ {{ item.product.salePrice }}</td>
                  <td class="text-right">R$ {{ item.product.salePrice * item.quantity }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <v-label><strong class="mr-1"> Quantidade de produtos </strong> {{ itemsCart.length }}</v-label>
                  </td>
                  <td>
                    <v-label> <strong class="mr-1"> Valor da venda R$</strong> {{ salePrice }} </v-label>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tfoot>
            </v-table>
            <v-alert v-else type="info" color="grey" variant="contained-text">
              Por enquanto o carinho está vazio. Adicione ao menos um produto.
            </v-alert>
          </v-card>
        </v-form>
      </v-card-content>
      <v-spacer></v-spacer>
      <v-card-actions style="justify-content: space-around">
        <v-btn class="ma-4"> Salvar </v-btn>
        <v-btn class="ma-4" @click="$router.back()"> Voltar </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { ItemFunctions } from "../../domain/functions/item-functions";
import { IItem } from "../../domain/interfaces/IItem";
import { IProduct } from "../../domain/interfaces/IProduct";
import { eSaleCanal, ISale } from "../../domain/interfaces/ISale";
import { ProductStore } from "../../store/product-store";
import SaleItemCard from "./SaleItemCard.vue";

const sale = ref<ISale>({} as ISale);

const productQuery = ref<string>();
const products = computed<IProduct[]>(() => ProductStore.state.list);
const productsDescription = computed(() =>
  products.value.map((p) => `${p.description} - ${p.code}`)
);
const itemsCart = ref<IItem[]>([]);
const itemSelected = ref<IItem>();
const salePrice = computed<number>(() => {
  return itemsCart.value
    .map(item => item.product.salePrice * item.quantity)
    .reduce((previous, current) => previous + current, 0)
})

function add(item: IItem) {
  const itemFinded: IItem | undefined = itemsCart.value.find(p => p.product.id == item.product.id);
  if (!itemFinded) return itemsCart.value.unshift(item);
  const itemIndex: number = itemsCart.value.indexOf(itemFinded);
  itemsCart.value[itemIndex] = item;
}

watch(productQuery, () => {
  if (!productQuery.value) return;
  const code: number = parseInt(productQuery.value.split("-")[1]);
  const product: IProduct = products.value.find((p) => p.code == code)!;
  const isInTheCart: IItem | undefined = itemsCart.value.find(item => item.product.code == product.code);
  if (isInTheCart) itemSelected.value = ItemFunctions.copy(isInTheCart)
  else itemSelected.value = { product, quantity: 1 };
});

onMounted(async () => {
  await ProductStore.actions.fetchAll();
});
</script>

<style scoped>
#autocomplete-category input {
  width: 100px;
}

.sale-img {
  width: 50px;
  height: 50px;
  font-size: 50px;
}

.selected-row {
  background-color: #47474750;
}
</style>
