<template>
  <v-card class="mx-auto ma-0 pa-0" :border="GREY.darken4" density="compact">
    <div class="counter-actions">
      <MouseCount :increase="true" :count="count" />
      <label style="font-size: large;">{{ count.value }}</label>
      <MouseCount :increase="false" :count="count" />
    </div>
    <div class="title">
      <v-card-title>
        <v-avatar class="mr-2" size="50" rounded="0">
          <v-img v-if="item.product.imageUrl" :src="item.product.imageUrl" cover eager />
          <v-icon v-else size="50">mdi-image</v-icon>
        </v-avatar>
        {{ item.product.description }} — {{ item.product.code }}
      </v-card-title>
    </div>
    <v-card-subtitle class="mt-2">
      <span>{{ item.product.company }}: {{ item.product.brand }} </span>
    </v-card-subtitle>
    <v-expand-transition>
      <div v-show="expand">
        <v-divider class="mt-2"></v-divider>
        <v-form class="mr-10 ml-10 mt-5" style="cursor: default;">
          <p><strong class="product-info-label">Categoria</strong> {{ item.product.category }}</p>
          <p><strong class="product-info-label">Estoque</strong> {{ item.product.quantity }}</p>
          <p><strong class="product-info-label">Fabricante </strong>{{ item.product.company }}</p>
          <p>
            <strong class="product-info-label">Preço de venda R$</strong>
            <label v-if="!editSalePrice" class="mr-2"> {{ item.product.salePrice }}</label>
            <input v-else v-model="item.product.salePrice" type="number">
            <v-icon @click="editSalePrice = !editSalePrice" size="small" style="cursor: pointer;">
              {{ editSalePrice ? "mdi-check" : "mdi-pencil" }}
            </v-icon>
          </p>
          <p>
            <strong class="product-info-label">Preço de compra R$</strong>
            <label v-if="!editPurchasePrice" class="mr-2"> {{ item.product.purchasePrice }}</label>
            <input v-else v-model="item.product.purchasePrice" type="number">
            <v-icon @click="editPurchasePrice = !editPurchasePrice" size="small" style="cursor: pointer;">
              {{ editPurchasePrice ? "mdi-check" : "mdi-pencil" }}
            </v-icon>
          </p>
        </v-form>
      </div>
    </v-expand-transition>
    <v-card-actions>
      <v-btn :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="expand = !expand"></v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="onClickRemove" size="x-large">
        <v-icon size="x-large">mdi-delete</v-icon>
        <v-tooltip anchor="bottom" activator="parent">
          Remover da venda
        </v-tooltip>
      </v-btn>
      <v-btn @click="onClickAdd" size="x-large">
        <v-icon size="x-large">mdi-cart-plus</v-icon>
        <v-tooltip anchor="bottom" activator="parent">
          Adicionar á venda
        </v-tooltip>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { onUpdated, reactive, ref } from "vue";
import { GREY } from "../../colors";
import { IItem } from "../../domain/interfaces/IItem";
import MouseCount from "../widgets/MouseCount.vue";

interface Props {
  item: IItem;
}

interface Emits {
  (event: "onAdd", item: IItem): void;
  (event: "onDelete", item: IItem): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const expand = ref(false);
const editPurchasePrice = ref(false)
const editSalePrice = ref(false)

const count = reactive({
  value: ref<number>(props.item.quantity),
});

function onClickAdd() {
  const newItem: IItem = {
    product: { ...props.item.product },
    quantity: count.value
  }
  emits("onAdd", newItem);
}

function onClickRemove() {
  emits("onDelete", props.item);
}

onUpdated(() => {
  count.value = props.item.quantity;
})

</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  word-wrap: break-word;
}

.counter-actions {
  position: absolute;
  right: 0;
  margin-top: 5px;
}

.product-info-label {
  margin-right: 2px;
  color: grey;
}

input {
  outline: 0;
  color: aliceblue;
  width: 80px;
  height: 17px;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: grey;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
