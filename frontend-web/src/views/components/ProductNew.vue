<template>
  <v-card density="compact" style="height: 100%; display: flex; flex-direction: column">
    <span class="loading-card" :style="`width: ${loadingProgress}%`"></span>
    <v-card-header>
      <v-card-title class="d-flex justify-center w-100"> Novo Produto </v-card-title>
    </v-card-header>
    <v-card-content>
      <div class="d-flex justify-center ma-2">
        <label for="image-input">
          <img v-if="imagePreview" class="product-img" :src="imagePreview" />
          <v-icon v-else class="product-img">mdi-image</v-icon>
        </label>
        <input
          id="image-input"
          name="image-input"
          type="file"
          accept="image/*"
          @change="onGetImage"
        />
      </div>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="3" md="3">
              <v-text-field
                color="white"
                label="Código"
                v-model="product.code"
                type="number"
                hint="Código de barras do produto"
                :counter="10"
                required
              />
            </v-col>
            <v-col cols="12" sm="9" md="9">
              <v-text-field
                label="Descrição"
                v-model="product.description"
                hint="Titulo/nome do produto"
                required
              />
            </v-col>
            <v-col cols="12" sm="5" md="5">
              <v-select
                :items="Object.values(eCompany)"
                v-model="product.company"
                label="Fabricante"
                hint="Nome empresa responsavel por fabricar o produto (ex: Avon, Natura, etc)"
                required
              />
            </v-col>
            <v-col cols="12" sm="7" md="7">
              <v-autocomplete
                label="Selecione a categoria"
                :items="Object.values(eCategory)"
                v-model="product.category"
                hint="Categoria do produto (ex: Shampoo, Sabonete, Hidratante, etc)"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Marca"
                v-model="product.brand"
                hint="Marca/linha a qual o produto pertence"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                :items="storesSelectList"
                eager
                v-model="storeQuery"
                :item-text="'name'"
                return-object
                label="Selecione a empresa"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-text-field
                label="Preço de compra"
                v-model="product.purchasePrice"
                hint="Custo de aquisição para este produto"
                required
              />
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-text-field
                label="Preço de venda"
                v-model="product.salePrice"
                hint="Valor padrão para a revenda deste produto"
                required
              />
            </v-col>
            <v-col cols="12" md="2" sm="2">
              <v-text-field
                label="Quantidade"
                v-model="product.quantity"
                hint="Unidades desse produto"
                required
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card-content>
    <span v-if="true" class="loading-card" :style="`width: ${loadingProgress}%`"></span>
    <FloatingActions>
      <div>
        <v-btn color="blue darken-1" block @click="handleSave" variant="text">
          <v-icon class="mr-1">mdi-check-all</v-icon>
          Salvar
        </v-btn>
      </div>
      <v-divider vertical></v-divider>
      <div>
        <v-btn :color="GREY.lighten" block variant="text">
          <v-icon class="mr-1">mdi-cached</v-icon>
          Limpar
        </v-btn>
      </div>
      <v-divider vertical></v-divider>
      <div>
        <v-btn color="green" block @click="clean" variant="text">
          <v-icon class="mr-1">mdi-keyboard-return</v-icon>
          sair
        </v-btn>
      </div>
    </FloatingActions>
  </v-card>
</template>

<script setup lang="ts">
import { GREY } from "@/colors";
import { computed, onMounted, ref, watch } from "vue";
import { ProductHttp } from "../../domain/api/ProductsHttp";
import { StoreHttp } from "../../domain/api/StoreHttp";
import { IAlert } from "../../domain/interfaces/IAlert";
import { eCategory, eCompany, IProduct } from "../../domain/interfaces/IProduct";
import { IStore } from "../../domain/interfaces/IStore";
import { getURLImage, upload } from "../../domain/storage/functions";
import { AlertStore } from "../../store/alert-store";
import { ProductStore } from "../../store/product-store";
import FloatingActions from "./FloatingActions.vue";

const dialog = ref(false);
const valid = true;
const product = ref<IProduct>({} as IProduct);

const storeQuery = ref<string>();
const stores = ref<IStore[]>([]);
const storesSelectList = computed<string[]>(() => {
  return stores.value.map(store => `${store.id} - ${store.name}`)
})
const selectedStore = computed<IStore | undefined>(() => {
  const id = parseInt(storeQuery.value?.split("-")[0]!);
  const result = stores.value.find((store) => store.id === id);
  return result;});

const imageFile = ref();
const imagePreview = ref("");
const loadingProgress = ref(0);

async function onGetImage(e: any) {
  const file = e.target.files[0];
  imagePreview.value = URL.createObjectURL(file);
  imageFile.value = file;
}

async function uploadImage(): Promise<string> {
  const path = await upload(product.value, imageFile.value);
  const downloadPath = await getURLImage(path);
  return downloadPath;
}

async function save(): Promise<IProduct> {
  product.value.imageUrl = await uploadImage();
  const productSaved = await ProductHttp.save(product.value);
  return productSaved;
}

function setIntervalProgressBar(): NodeJS.Timeout {
  const interval = setInterval(() => {
    loadingProgress.value = loadingProgress.value + 1;
    if (loadingProgress.value >= 100) {
      loadingProgress.value = 0;
    }
  }, 20);
  return interval;
}

async function handleSave() {
  const interval = setIntervalProgressBar();
  const alert: IAlert = {} as IAlert;
  alert.entity = "PRODUCT";
  alert.operation = "SAVE";
  try {
    ProductStore.actions.add(await save());
    alert.type = "SUCCESS";
    alert.msg = `O produto ${product.value.description.toUpperCase()} foi salvo com sucesso`;
  } catch {
    alert.type = "ERROR";
    alert.msg = `Não foi possivel salvar o produto : ${product.value.description}`;
  } finally {
    clean();
    clearInterval(interval);
    AlertStore.actions.add(alert);
  }
}

function clean() {
  dialog.value = false;
  product.value = {} as IProduct;
  loadingProgress.value = 0;
  imagePreview.value = "";
  imageFile.value = {};
}

watch(selectedStore, () => {
  console.log({...selectedStore.value})
})

onMounted(async () => {
  stores.value = await StoreHttp.fetchAll();
});
</script>

<style scoped>
#autocomplete-category input {
  width: 100px;
}

.product-img {
  width: 50px;
  height: 50px;
  font-size: 50px;
}

.product-img:hover {
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
</style>
