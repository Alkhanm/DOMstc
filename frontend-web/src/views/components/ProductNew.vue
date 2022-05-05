<template>
  <v-card density="compact" style="height: 100%; display: flex; flex-direction: column">
    <span class="loading-card" :style="`width: ${loadingProgress}%`"></span>
    <v-card-title class="d-flex justify-center w-100"> Novo Produto </v-card-title>
    <v-card-content class="mt-0 pt-0">
      <div class="d-flex justify-center mb-2">
        <label for="image-input">
          <img v-if="imagePreview" class="product-img" :src="imagePreview" />
          <v-icon v-else class="product-img">mdi-image</v-icon>
        </label>
        <input id="image-input" name="image-input" type="file" accept="image/*" @change="onGetImage" />
      </div>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col class="column" cols="12" sm="3" md="3">
              <v-text-field color="white" label="Código" v-model="product.code" type="number"
                hint="Código de barras do produto" :counter="10" required prepend-inner-icon="mdi-barcode" />
            </v-col>
            <v-col class="column" cols="12" sm="9" md="9">
              <v-text-field label="Descrição" v-model="product.description" hint="Titulo/nome do produto" required
                prepend-inner-icon="mdi-format-title" />
            </v-col>
            <v-col class="column d-flex" cols="12" sm="5" md="5">
              <v-select :items="Object.values(eCompany)" v-model="product.company" label="Fabricante"
                hint="Nome empresa responsavel por fabricar o produto (ex: Avon, Natura, etc)" required
                prepend-inner-icon="mdi-factory" />
              <div class="add-new">
                <v-icon size="xx-large">mdi-database-plus</v-icon>
              </div>
            </v-col>
            <v-col class="column d-flex" cols="12" sm="7" md="7">
              <v-autocomplete label="Selecione a categoria" :items="categoriesSelectList" v-model="categoryQuery"
                hint="Categoria do produto (ex: Shampoo, Sabonete, Hidratante, etc)" required
                prepend-inner-icon="mdi-format-list-bulleted-type " />
              <div class="add-new">
                <v-icon size="xx-large">mdi-database-plus</v-icon>
              </div>
            </v-col>
            <v-col class="column" cols="12">
              <v-text-field label="Marca" v-model="product.brand" hint="Marca/linha a qual o produto pertence" required
                prepend-inner-icon="mdi-format-title" />
            </v-col>
            <v-col class="column" md="7" sm="7">
              <v-text-field label="Preço de compra" v-model="product.purchasePrice"
                hint="Custo de aquisição para este produto" required prepend-inner-icon="mdi-cash" />
            </v-col>
            <v-col class="column" md="5" sm="5">
              <v-text-field label="Estoque" v-model="product.quantity" hint="Unidades desse produto" required
                prepend-inner-icon="mdi-counter" />
            </v-col>
            <v-col class="column d-flex" md="5" sm="5">
              <v-select :items="storesSelectList" v-model="storeQuery" return-object label="Definir valores desta loja:"
                prepend-inner-icon="mdi-shopping" />
              <div class="add-new">
                <v-icon size="xx-large">mdi-database-plus</v-icon>
              </div>
            </v-col>
            <v-col class="column" md="3" sm="3">
              <v-text-field :label="`Preço de venda (${storeQuery.toLowerCase()})`" v-model="productStore.price"
                hint="Valor padrão para a revenda deste produto" required prepend-inner-icon="mdi-cash" />
            </v-col>
            <v-col class="column" md="3" sm="3">
              <v-text-field :label="`Estoque (${storeQuery.toLowerCase()})`" v-model="productStore.quantity"
                hint="Unidades desse produto" required prepend-inner-icon="mdi-counter" />
            </v-col>
            <v-col class="column" md="1" sm="1">
              <v-btn @click="addProductStore" variant="text" height="56">
                <v-icon size="xx-large">mdi-check-underline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card-content>
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
        <v-btn color="green" block @click="$router.back()" variant="text">
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
import { ICategory } from "../../domain/interfaces/ICategory";
import { eCompany, IProduct } from "../../domain/interfaces/IProduct";
import { IProductStore } from "../../domain/interfaces/IProductStore";
import { IStore } from "../../domain/interfaces/IStore";
import { getURLImage, upload } from "../../domain/storage/functions";
import { AlertStore } from "../../store/alert-store";
import { ProductStore } from "../../store/product-store";
import FloatingActions from "./FloatingActions.vue";

const valid = true;
const product = ref<IProduct>({ productStores: [] as IProductStore[] } as IProduct);
const productEmpty: IProduct = product.value;

const categoryQuery = ref<string>("");
const categories = ref<ICategory[]>([] as ICategory[])
const categoriesSelectList = computed(() => categories.value.map(({ name }) => name.toUpperCase()));

const storeQuery = ref<string>("TODAS");
const stores = ref<IStore[]>([]);

const storesSelectList = computed<string[]>(() => {
  const list: string[] = stores.value.map((store) => store.name);
  list.unshift("TODAS");
  return list;
});

const productStore = ref<IProductStore>({} as IProductStore);

const selectedStore = computed<IStore | null>(() => {
  if (!storeQuery) return null;
  const result = stores.value.find(
    (s) => s.name.toLowerCase() === storeQuery.value.toLowerCase()
  );
  return result || null;
});

watch(categoryQuery, () => {
  if (!categoryQuery) return;
  const result = categories.value.find(
    (s) => s.name.toLowerCase() === categoryQuery.value.toLowerCase()
  );
  if (result) product.value.category = result;
})

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

function addProductStore() {
  if (!productStore.value) return;
  if (selectedStore.value) productStore.value.store = selectedStore.value;
  product.value.productStores.push(productStore.value);
}

async function save(): Promise<IProduct> {
  product.value.imageUrl = await uploadImage();
  const productSaved = await ProductHttp.save(product.value);
  return productSaved;
}


async function handleSave() {
  const alert: IAlert = {} as IAlert;
  alert.entity = "PRODUCT";
  alert.operation = "SAVE";
  try {
    ProductStore.actions.add(await save());
    alert.type = "SUCCESS";
    alert.msg = `O produto ${product.value.description.toUpperCase()} foi salvo com sucesso`;
    clean();
  } catch {
    alert.type = "ERROR";
    alert.msg = `Não foi possivel salvar o produto : ${product.value.description}`;
  } finally {
    AlertStore.actions.add(alert);
  }
}

function clean() {
  product.value = { ...productEmpty };
  imagePreview.value = "";
  imageFile.value = {};
}

onMounted(async () => {
  stores.value = await StoreHttp.fetchAll();
  categories.value = await ProductHttp.fetchAllCategories();
});
</script>

<style scoped>
#autocomplete-category input {
  width: 100px;
}

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

#image-input {
  display: none;
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

.loading-card {
  border-top-style: solid;
  border-top-width: 5px;
  border-top-color: #2196f3;
}
</style>
