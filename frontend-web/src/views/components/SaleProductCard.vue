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
          <v-img :src="product.imageUrl" eager cover />
        </v-avatar>
        {{ product.description }} — {{ product.code }}
      </v-card-title>
    </div>
    <v-card-subtitle class="mt-2">
      <span>{{ product.company }}: {{ product.brand }} </span>
    </v-card-subtitle>
    <v-expand-transition>
      <div v-show="expand">
        <v-divider class="mt-2"></v-divider>
        <v-card-text>
          <p><strong>Id: </strong> {{ product.id }}</p>
          <p><strong>Categoria</strong> {{ product.category }}</p>
          <p><strong>Estoque</strong> {{ product.quantity }}</p>
          <p><strong>Fabricante </strong>{{ product.company }}</p>
          <p>
            <strong>Preço de venda </strong>
            <v-label class="mr-2">{{ product.salePrice }}</v-label>
            <strong>Preço de compra </strong>
            <v-label class="mr-2">{{ product.purchasePrice }}</v-label>
          </p>
        </v-card-text>
      </div>
    </v-expand-transition>
    <v-card-actions>
      <v-btn
        :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="expand = !expand"
      ></v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="onClickAdd" size="x-large" rounded>
        <v-icon size="x-large">mdi-cart-plus</v-icon>
        <v-tooltip anchor="bottom" activator="parent">
          Adicionar á venda
        </v-tooltip>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { GREY, RED } from "../../colors";
import { IProduct } from "../../domain/interfaces/IProduct";
import MouseCount from "../widgets/MouseCount.vue";

interface Props {
  product: IProduct;
}

interface Emits {
  (event: "onAdd", product: IProduct): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const expand = ref(false);

const count = reactive({
  value: ref<number>(1),
});

function onClickAdd() {
  emits("onAdd", props.product);
}
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
</style>
