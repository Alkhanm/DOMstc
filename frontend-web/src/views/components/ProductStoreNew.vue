<template>
  <v-btn @click="isVisible = true" height="40" variant="text" style="pr-0 mr-0">
    <v-icon style="ma-0 pa-0" size="x-large">mdi-store</v-icon>
    Definir valor para lojas
  </v-btn>
  <v-dialog v-model="isVisible">
    <v-card width="600px">
      <v-card-header style="display: flex; justify-content: center; margin-bottom: 10px">
        <v-card-title>Definir valor para lojas </v-card-title>
      </v-card-header>
      <v-card-content>
        <v-form ref="form" v-model="valid" :lazy-validation="true">
          <v-row>
            <v-col cols="12" class="column d-flex">
              <v-select
                :items="storesSelectList"
                v-model="storeQuery"
                label="Definir valores desta loja:"
                prepend-inner-icon="mdi-shopping"
                :rules="storeRules"
              />
              <div class="add-new">
                <v-icon size="xx-large">mdi-database-plus</v-icon>
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="column">
              <v-text-field
                label="Preço de venda"
                v-model="productShop.price"
                hint="Valor padrão para a revenda deste produto"
                @keypress="UtilFunctions.acceptOnlyNumber"
                required
                prepend-inner-icon="mdi-cash"
                :rules="priceRules"
              />
            </v-col>
            <v-col cols="12" sm="5" md="5" class="column">
              <v-text-field
                label="Estoque"
                v-model="productShop.quantity"
                @keypress="UtilFunctions.acceptOnlyIntegerNumber"
                hint="Unidades desse produto"
                required
                prepend-inner-icon="mdi-counter"
                :rules="quantityRules"
              />
            </v-col>
            <v-col cols="12" sm="1" md="1" class="column">
              <v-btn @click="addProductShop" block variant="contained-text" height="56px">
                <v-icon size="xx-large">mdi-check</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-table v-if="productShopList.length" height="200">
          <thead>
            <tr>
              <th>Loja</th>
              <th>Preço</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ps of productShopList" @click="handlerSelectTable(ps)">
              <td>{{ ps.store.name }}</td>
              <td>{{ ps.price }}</td>
              <td>{{ ps.quantity }}</td>
            </tr>
          </tbody>
        </v-table>
        <v-alert v-else class="mt-5" type="info" color="grey" variant="contained-text">
          Caso nenhuma loja seja salva, esse produto será cadastrado em todas com o valor
          de venda padrão.
        </v-alert>
      </v-card-content>
      <v-card-actions>
        <v-btn @click="handlerConfirm" :disabled="!valid" variant="contained-text" block>
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { StoreHttp } from "../../domain/api/StoreHttp";
import { IProduct } from "../../domain/interfaces/IProduct";
import { IProductShop } from "../../domain/interfaces/IProductShop";
import { IStore } from "../../domain/interfaces/IStore";
import { UtilFunctions } from "../../domain/functions/util-functions";
import { RulesFunctions } from "../../domain/functions/rules-functions";
const { product } = defineProps<{ product: IProduct }>();

const isVisible = ref(false);
const form = ref();
const valid = ref<boolean>(true);

const { priceRules, quantityRules, storeRules } = RulesFunctions;

const storeQuery = ref<string>("NENHUMA");
const stores = ref<IStore[]>([]);

const productShop = ref<IProductShop>({} as IProductShop);
const productShopList = ref<IProductShop[]>([]);

const storesSelectList = computed<string[]>(() => {
  const list: string[] = stores.value.map(({ id, name }) => `${id} - ${name}`);
  list.unshift("NENHUMA");
  return list;
});

const selectedStore = computed<IStore | null>(() => {
  if (!storeQuery || storeQuery.value === "TODAS") return null;
  const id = parseInt(storeQuery.value.split("-")[0]);
  const result = stores.value.find((s) => s.id == id);
  return result!;
});

async function addProductShop() {
  const validate = await form.value.validate();
  if (!validate.valid) return;
  if (!selectedStore.value) return;
  productShop.value.store = selectedStore.value;
  const productShopIndex: number = productShopList.value.findIndex(
    (ps) => ps.store.id === productShop.value.store.id
  );
  if (productShopIndex === -1)
    return productShopList.value.push({ ...productShop.value });
  const productShopFinded = productShopList.value[productShopIndex];
  productShopList.value[productShopIndex] = {
    ...productShop.value,
    store: productShopFinded.store,
  };
}

function handlerSelectTable(ps: IProductShop) {
  productShop.value = { ...ps };
  storeQuery.value = `${ps.store.id} - ${ps.store.name}`;
}

async function handlerConfirm() {
  const validate: any = await form.value.validate();
  if (!validate.valid) return;
  product.productShops = productShopList.value;
  isVisible.value = false;
}

watch(productShop.value, async () => {
  if (!valid.value) await form.value.resetValidation();
});

onMounted(async () => {
  stores.value = await StoreHttp.fetchAll();
});
</script>

<style scoped>
.column {
  padding: 0px;
  padding-left: 5px;
  padding-right: 5px;
}

.product-img {
  width: 50px;
  height: 50px;
  font-size: 50px;
}

.product-img:hover {
  cursor: pointer;
}

.add-new {
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 3px;
  margin-right: 5px;
  cursor: pointer;
  border-bottom-style: solid;
  border-bottom-width: 1.5px;
  border-bottom-color: rgba(104, 104, 102, 0.863);
}
</style>
