<!-- <template>
  <v-btn dark @click.stop="dialog = true">
    <v-icon class="ma-1">mdi-database-plus</v-icon>
    Novo
  </v-btn>

  <v-dialog v-model="dialog" max-width="700">
    <v-card class="mx-auto">
      <span class="loading-card" :style="`width: ${loadingProgress}%`"></span>
      <v-card-title class="d-flex justify-center">
        <span>Novo Produto</span>
      </v-card-title>
      <div class="d-flex justify-center ma-2">
        <label for="image-input">
          <img v-if="imagePreview" class="sale-img" :src="imagePreview" />
          <v-icon v-else class="sale-img">mdi-image</v-icon>
        </label>
        <input id="image-input" name="image-input" type="file" accept="image/*" @change="onGetImage" />
      </div>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="5" md="5">
              <v-text-field color="white" label="Código" v-model="sale.code"  type="number"
                hint="Código de barras do produto" :counter="10" required />
            </v-col>
            <v-col cols="12" sm="7" md="7">
              <v-text-field label="Descrição" v-model="sale.description" hint="Titulo/nome do produto" required />
            </v-col>
            <v-col cols="12" sm="5" md="5">
              <v-select :items="Object.values(eCompany)" v-model="sale.company" label="Fabricante"
                hint="Nome empresa responsavel por fabricar o produto (ex: Avon, Natura, etc)" required></v-select>
            </v-col>
            <v-col cols="12" sm="7" md="7">
              <v-autocomplete label="Selecione a categoria" :items="Object.values(eCategory)" v-model="sale.category"
                hint="Categoria do produto (ex: Shampoo, Sabonete, Hidratante, etc)" required />
            </v-col>
            <v-col cols="12">
              <v-text-field label="Marca" v-model="sale.brand" hint="Marca/linha a qual o produto pertence" required>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Quantidade" v-model="sale.quantity" hint="Unidades disponiveis deste produto"
                required />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field label="Preço de compra" v-model="sale.purchasePrice"
                hint="Custo de aquisição para este produto" required />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field label="Preço de venda" v-model="sale.salePrice"
                hint="Valor padrão para a revenda deste produto" required />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <span v-if="true" class="loading-card" :style="`width: ${loadingProgress}%`"></span>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onClickSave"> Salvar </v-btn>
        <v-btn color="blue darken-1" text @click="clean"> Cancelar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SaleHttp } from "../../domain/api/SalesHttp";
import { IAlert } from "../../domain/interfaces/IAlert";
import { ISale } from "../../domain/interfaces/ISale";
import { getURLImage, upload } from "../../domain/storage/functions";
import { AlertStore } from "../../store/alert-store";

const dialog = ref(false);
const valid = true;
const sale = ref<ISale>({} as ISale);
const imageFile = ref();
const imagePreview = ref("");
const loadingProgress = ref(0)

async function onGetImage(e: any) {
  const file = e.target.files[0];
  imagePreview.value = URL.createObjectURL(file);
  imageFile.value = file;
}

async function uploadImage(): Promise<string> {
  const path = await upload(sale.value, imageFile.value);
  const downloadPath = await getURLImage(path)
  return downloadPath;
}

async function save(): Promise<ISale> {
  sale.value.imageUrl = await uploadImage();
  const saleSaved = await SaleHttp.save(sale.value);
  return saleSaved;
}

function setIntervalProgressBar(): NodeJS.Timeout {
  const interval = setInterval(() => {
    loadingProgress.value = loadingProgress.value + 1;
    if (loadingProgress.value >= 100) {
      loadingProgress.value = 0;
    }
  }, 20)
  return interval;
}


async function onClickSave() {
  const interval = setIntervalProgressBar()
  const alert: IAlert = {} as IAlert;
  alert.entity = "PRODUCT";
  alert.operation = "SAVE";
  try {
    ProductStore.actions.add(await save());
    alert.type = "SUCCESS";
    alert.msg = `O produto ${sale.value.description.toUpperCase()} foi salvo com sucesso`
  } catch {
    alert.type = "ERROR";
    alert.msg = `Não foi possivel salvar o produto : ${sale.value.description}`
  } finally {
    clean();
    clearInterval(interval);
    AlertStore.actions.add(alert);
  }
}

function clean() {
  dialog.value = false;
  sale.value = {} as ISale;
  loadingProgress.value = 0;
  imagePreview.value = "";
  imageFile.value = {}
}

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
  border-top-color: #2196F3;
}
</style>
-->