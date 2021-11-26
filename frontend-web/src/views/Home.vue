<template>
  <div class="">
    <ProductList :list="productList" />
  </div>
</template>

<script lang="ts">
import API from "@/domain/api";
import { reactive, ref, toRefs } from "@vue/reactivity";
import ProductList from "./components/ProductList.vue";
import { onMounted } from "@vue/runtime-core";
import iProduct from "../domain/iProduct";

export default {
  name: "Home",
  components: {
    ProductList,
  },
  setup() {
    const data = reactive({
      productList: [] as iProduct[],
    });

    onMounted(async () => {
      data.productList = await API.getProducts();
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style scoped>
.products {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>