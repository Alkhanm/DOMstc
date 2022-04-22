<template>
  <v-container fluid class="h-100">
    <v-card class="h-flex" density="compact">
      <v-card-title class="d-flex justify-center">
        <span>Nova Venda</span>
      </v-card-title>
      <v-card-content class="" style="width: 100%">
        <v-form style="max-width: 1000px; width: 100%" ref="form">
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Descrição da venda (opcional)"
                hint="Nome/descrião da venda"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                label="Canal da venda"
                :items="Object.values(eSaleCanal)"
                hint="Plataforma na qual a venda ocorreu (Ex: Shoppee, Amazon, Mercado Livre, etc)"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card class="mx-auto h-flex" variant="text" density="compact">
            <v-card-title>
              <h5>Pesquisar produto(s)</h5>
            </v-card-title>
            <v-autocomplete
              v-model="productQuery"
              :items="productsDescription"
              prepend-icon="mdi-cart"
              label="Pesquisar produto(s)"
              clearable
              no-data-text="Não há produtos no estoque"
            />
            <SaleProductCard
              @on-add="add"
              v-if="productSelected"
              :product="productSelected"
            />
            <v-divider class="mt-5"></v-divider>

            <v-table v-if="productCart.size" height="250px" fixed-header fixed-footer>
              <thead>
                <tr>
                  <th>
                    <v-card-title> Produtos </v-card-title>
                  </th>
                  <th class="text-left">Descrição</th>
                  <th class="text-left">Quantidade</th>
                  <th class="text-left">Preço unitario</th>
                  <th class="text-left">Preço total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  @click="productSelected = product"
                  v-for="product in productCart"
                  :focus="true"
                >
                  <td>
                    <img class="mt-2" width="40" height="40" :src="product.imageUrl" />
                  </td>
                  <td>{{ product.description }}</td>
                  <td>{{}}</td>
                  <td>{{ product.salePrice }}</td>
                  <td>{{}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <v-label
                      ><strong class="mr-1"> Quantidade de produtos </strong
                      > {{  productCart.size }}</v-label
                    >
                  </td>
                  <td>
                    <v-label> <strong class="mr-1"> Valor da venda R$</strong> 0.0 </v-label>
                  </td>
                  <td>
                  </td>
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
import { IProduct } from "../../domain/interfaces/IProduct";
import { eSaleCanal, ISale } from "../../domain/interfaces/ISale";
import { ProductStore } from "../../store/product-store";
import SaleProductCard from "./SaleProductCard.vue";

const sale = ref<ISale>({} as ISale);
const loadingProgress = ref(0);

const products = computed<IProduct[]>(() => ProductStore.state.list);
const productCart = ref<Set<IProduct>>(new Set());
const productsDescription = computed(() =>
  products.value.map((p) => `${p.description} - ${p.code}`)
);
const productQuery = ref<string>();
const productSelected = ref<IProduct>();

function add(product: IProduct) {
  productCart.value.add(product);
}

watch(productQuery, () => {
  if (!productQuery.value) return;
  const code: number = parseInt(productQuery.value.split("-")[1]);
  const product: IProduct = products.value.find((p) => p.code === code)!;
  productSelected.value = product;
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

.sale-img:hover {
  cursor: pointer;
}

#image-input {
  display: none;
}

.loading-card {
  border-top-style: solid;
  border-top-width: 5px;
  border-top-color: #2196f3;
}

.sale-type-radio {
  justify-content: center;
  align-items: center;
  justify-items: center;
}

.v-selection-control--density-default {
  /*Ajusta tamanho do radio button do Vuetify */
  height: 30px;
}
</style>
