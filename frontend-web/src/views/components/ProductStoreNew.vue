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
        <v-row>
          <v-col cols="12" class="column d-flex">
            <v-select :items="storesSelectList" v-model="storeQuery" label="Definir valores desta loja:"
              prepend-inner-icon="mdi-shopping" />
            <div class="add-new">
              <v-icon size="xx-large">mdi-database-plus</v-icon>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="6" class="column">
            <v-text-field label="Preço de venda" v-model="productStore.price"
              hint="Valor padrão para a revenda deste produto" required prepend-inner-icon="mdi-cash" />
          </v-col>
          <v-col cols="12" sm="4" md="4" class="column">
            <v-text-field label="Estoque" v-model="productStore.quantity" hint="Unidades desse produto" required
              prepend-inner-icon="mdi-counter" />
          </v-col>
          <v-col cols="12" sm="2" md="2" class="column">
            <v-btn @click="addProductStore" block variant="contained-text" height="56px">
              <v-icon size="xx-large">mdi-check</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-table height="200">
          <thead>
            <tr>
              <th>Loja</th>
              <th>Preço</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="productStoreList.length" v-for="ps of productStoreList">
              <td>{{ ps.store.name }}</td>
              <td>{{ ps.price }}</td>
              <td>{{ ps.quantity }}</td>
            </tr>
            <v-alert style="padding: 4px;" v-else>
              Caso nenhuma loja seja salva, esse produto será salvo em todas elas com o valor de venda padrão.
            </v-alert>
          </tbody>
        </v-table>
        <v-btn variant="contained-text" block>
          Confirmar
        </v-btn>
      </v-card-content>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { StoreHttp } from "../../domain/api/StoreHttp";
import { IProduct } from "../../domain/interfaces/IProduct";
import { IProductStore } from "../../domain/interfaces/IProductStore";
import { IStore } from "../../domain/interfaces/IStore";

const isVisible = ref(false);

const { product } = defineProps<{ product: IProduct }>();

const storeQuery = ref<string>("TODAS");
const stores = ref<IStore[]>([]);

const productStore = ref<IProductStore>({} as IProductStore)
const productStoreList = ref<IProductStore[]>([])

const storesSelectList = computed<string[]>(() => {
  const list: string[] = stores.value.map(({ id, name }) => `${id} - ${name}`);
  list.unshift("TODAS");
  return list;
});

const selectedStore = computed<IStore | null>(() => {
  if (!storeQuery || storeQuery.value === "TODAS") return null;
  const id = parseInt(storeQuery.value.split("-")[0]);
  const result = stores.value.find(s => s.id == id);
  return result!;
});

function addProductStore() {
  if (!selectedStore.value) return;
  productStore.value.store = selectedStore.value;
  const productStoreFinded = productStoreList.value.find((e) => e.store.id === productStore.value.store.id);
  if (!productStoreFinded) return productStoreList.value.push({ ...productStore.value });
  const { price, quantity } = productStore.value;
  productStoreFinded.price = price ? price : productStoreFinded.price;
  productStoreFinded.quantity = quantity ? quantity : productStoreFinded.quantity;
}

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
