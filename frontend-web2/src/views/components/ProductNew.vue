<template>
  <v-btn dark @click.stop="dialog = true">
    <v-icon>mdi-database-plus</v-icon>
    Novo
  </v-btn>

  <v-dialog v-model="dialog" max-width="700">
    <v-card class="mx-auto">
      <v-card-title class="d-flex justify-center">
        <span class="text-h5">Novo Produto</span>
      </v-card-title>
      <div class="d-flex justify-center ma-2">
        <label for="image-input">
          <img v-if="image.url" class="product-img" :src="image.url" />
          <v-icon v-else class="product-img">mdi-image</v-icon>
        </label>
        <input
          id="image-input"
          name="image-input"
          type="file"
          accept="image/*"
          @change="uploadImage"
        />
      </div>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="5">
              <v-text-field
                color="white"
                label="Código"
                v-model="product.code"
                required
                type="number"
                hint="Código de barras do produto"
              />
            </v-col>
            <v-col cols="12" sm="6" md="7">
              <v-text-field
                label="Descrição"
                v-model="product.description"
                hint="Titulo/nome do produto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="5">
              <v-select
                :items="Object.values(eCompany)"
                v-model="product.company"
                label="Fabricante"
                hint="Nome empresa responsavel por fabricar o produto (ex: Avon, Natura, etc)"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="8" md="7">
              <v-text-field
                label="Marca"
                v-model="product.brand"
                hint="Marca/linha a qual o produto pertence"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Quantidade"
                v-model="product.quantity"
                hint="Unidades disponiveis deste produto"
                required
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Preço de compra"
                v-model="product.purchasePrice"
                hint="Custo de aquisição para este produto"
                required
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Preço de venda"
                v-model="product.salePrice"
                hint="Valor padrão para a revenda deste produto"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                label="Selecione a categoria"
                :items="Object.values(eCategory)"
                v-model="product.category"
                hint="Categoria do produto (ex: Shampoo, Sabonete, Hidratante, etc)"
              >
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="save()"> Salvar </v-btn>
        <v-btn color="blue darken-1" text @click="limpar()"> Cancelar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { eCategory, eCompany, IProduct } from "../../domain/interfaces/IProduct";
import { getURLImage, upload } from "../../domain/storage/functions";

const dialog = ref(false);
const product: IProduct = reactive({} as IProduct);

const image = reactive({
  url: "",
});

function uploadImage(e: any) {
  const file = e.target.files[0];
  image.url = URL.createObjectURL(file)
  product.imageUrl = file;
}

async function save() {
  dialog.value = false;
  const path = await upload(product, product.imageUrl)
  const downloadPath = await getURLImage(path)
  image.url = downloadPath;
}
function limpar() {
  dialog.value = false;
  product.code = 0;
  product.description = "";
  product.category = eCategory.NENHUMA;
  product.company = eCompany.NENHUMA;
  product.brand = "";
  product.quantity = 0;
  product.salePrice = 0.0;
  product.purchasePrice = 0.0;
  product.imageUrl = "";
  image.url = "";
}

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
</style>
