<template>
  <v-card density="compact" style="height: 100%; display: flex; flex-direction: column">
    <v-card-title class="d-flex justify-center w-100"> Novo Produto </v-card-title>
    <v-card-content class="mt-0 pt-0">
      <div class="d-flex justify-center mb-2">
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
        <v-form ref="form" v-model="formValid" lazy-validation>
          <v-row>
            <v-col class="column" cols="12" sm="4" md="4">
              <v-text-field
                label="Código"
                v-model="product.code"
                hint="Código de barras do produto"
                maxlength="13"
                counter="13"
                required
                prepend-inner-icon="mdi-barcode"
                @keypress="UtilFunctions.acceptOnlyIntegerNumber"
                :rules="barcodeRules"
              />
            </v-col>
            <v-col class="column" cols="12" sm="8" md="8">
              <v-text-field
                label="Descrição"
                v-model="product.description"
                hint="Titulo/nome do produto"
                required
                prepend-inner-icon="mdi-format-title"
                :rules="defaultRules"
              />
            </v-col>
            <v-col class="column d-flex" cols="12" sm="5" md="5">
              <v-select
                v-model="product.company"
                :items="Object.values(eCompany)"
                label="Fabricante"
                hint="Nome empresa responsavel por fabricar o produto (ex: Avon, Natura, etc)"
                required
                prepend-inner-icon="mdi-factory"
                :rules="defaultRules"
              />
              <div class="add-new">
                <v-icon size="xx-large">mdi-database-plus</v-icon>
              </div>
            </v-col>
            <v-col class="column d-flex" cols="12" sm="7" md="7">
              <v-autocomplete
                label="Selecione a categoria"
                v-model="categoryQuery"
                :items="categorySelectList"
                hint="Categoria do produto (ex: Shampoo, Sabonete, Hidratante, etc)"
                required
                prepend-inner-icon="mdi-format-list-bulleted-type "
                :rules="autocompleteRules"
              />
              <div class="add-new">
                <v-icon size="xx-large">mdi-database-plus</v-icon>
              </div>
            </v-col>
            <v-col class="column" cols="12">
              <v-text-field
                label="Marca"
                v-model="product.brand"
                hint="Marca/linha a qual o produto pertence"
                required
                prepend-inner-icon="mdi-format-title"
                :rules="defaultRules"
              />
            </v-col>
            <v-col class="column" md="5" sm="4">
              <v-text-field
                label="Preço de compra"
                v-model="product.purchasePrice"
                hint="Custo de aquisição para este produto"
                required
                prepend-inner-icon="mdi-cash"
                prefix="R$"
                @keypress="UtilFunctions.acceptOnlyNumber"
                :rules="priceRules"
              />
            </v-col>
            <v-col class="column" md="5" sm="4">
              <v-text-field
                label="Preço de venda"
                v-model="product.salePrice"
                hint="Valor de venda (por padrão, aplica-se a todas as lojas)"
                required
                prepend-inner-icon="mdi-cash"
                prefix="R$"
                @keypress="UtilFunctions.acceptOnlyNumber"
                :rules="priceRules"
              />
            </v-col>
            <v-col class="column" md="2" sm="4">
              <v-text-field
                label="Estoque"
                v-model="product.quantity"
                hint="Unidades desse produto"
                required
                prepend-inner-icon="mdi-counter"
                @keypress="UtilFunctions.acceptOnlyIntegerNumber"
                :rules="defaultRules"
              />
            </v-col>
            <v-col class="column" md="3" sm="5">
              <ProductStoreNew :product="product" />
            </v-col>
            <v-col class="column" md="9" sm="7">
              <v-chip
                v-for="{ store } of product.productShops"
                class="mr-1"
                prepend-icon="mdi-store"
              >
                {{ store.name }}
              </v-chip>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card-content>
    <FloatingActions>
      <div>
        <v-btn @click="handlerSave" color="blue darken-1" block variant="text">
          <v-icon class="mr-1">mdi-check-all</v-icon>
          Salvar
        </v-btn>
      </div>
      <v-divider vertical></v-divider>
      <div>
        <v-btn @click="clean" :color="GREY.lighten" block variant="text">
          <v-icon class="mr-1">mdi-cached</v-icon>
          Limpar
        </v-btn>
      </div>
      <v-divider vertical></v-divider>
      <div>
        <v-btn color="green" block @click="$router.back()" variant="text">
          <v-icon class="mr-1">mdi-keyboard-return</v-icon>
          Sair
        </v-btn>
      </div>
    </FloatingActions>
  </v-card>
</template>

<script setup lang="ts">
import { GREY } from "@/colors";
import { computed, onMounted, ref, watch } from "vue";
import { ProductHttp } from "../../domain/api/ProductsHttp";
import { RulesFunctions } from "../../domain/functions/rules-functions";
import { UtilFunctions } from "../../domain/functions/util-functions";
import { ICategory } from "../../domain/interfaces/ICategory";
import { eCompany, IProduct } from "../../domain/interfaces/IProduct";
import { IProductShop } from "../../domain/interfaces/IProductShop";
import { ImageUploadHooks } from "../../hooks/image-upload-hooks";
import FloatingActions from "./FloatingActions.vue";
import ProductStoreNew from "./ProductStoreNew.vue";

const form = ref();
const formValid = ref(false);

const product = ref<IProduct>({ productShops: [] as IProductShop[] } as IProduct);

const { imageFile, imagePreview, onGetImage, uploadImage } = ImageUploadHooks.use(
  product
);

const categoryQuery = ref<string>("");
const categoryList = ref<ICategory[]>([] as ICategory[]);
const categorySelectList = computed(() =>
  categoryList.value.map(({ name }) => name.toUpperCase())
);

const { priceRules, defaultRules, barcodeRules, getAutocompleteRules } = RulesFunctions;
const autocompleteRules = computed(() =>
  getAutocompleteRules(product.value.category, categoryList.value)
);

async function save(): Promise<IProduct> {
  product.value.imageUrl = await uploadImage();
  const productSaved = await ProductHttp.save(product.value);
  return productSaved;
}

async function handlerSave() {
  const { valid } = await form.value.validate();
  if (!valid) return;
  product.value = await save();
}

function clean() {
  product.value = {} as IProduct;
  imagePreview.value = "";
  imageFile.value = {};
}

watch(categoryQuery, () => {
  const category = categoryList.value.find(
    (c) => c.name.toUpperCase() === categoryQuery.value
  );
  if (category) product.value.category = category;
});

onMounted(async () => {
  categoryList.value = await ProductHttp.fetchAllCategories();
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
