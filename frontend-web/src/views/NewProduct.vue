<template>
  <div class="container grid-lg">
    <div class="container lg wrapper">
      <div class="title"><span>Cadastrar Produto</span></div>
      <form @submit.prevent="saveProduct">
        <div class="row">
          <input
            id="field-name"
            v-model="product.name"
            type="text"
            placeholder="Nome/descrição"
            required
          />
        </div>
        <div class="row">
          <input
            id="field-purchase-price"
            v-model="product.purchasePrice"
            type="text"
            placeholder="Preço de compra"
            required
          />
        </div>
        <div class="row">
          <input
            id="field-sale-price"
            v-model="product.salePrice"
            type="text"
            placeholder="Preço de venda"
            required
          />
        </div>
        <div class="row">
          <input
            id="field-brand"
            v-model="product.brand"
            type="text"
            placeholder="Marca"
            required
          />
        </div>
        <div class="row">
          <input
            id="field-acquisition-date"
            v-model="product.acquisitionDate"
            type="date"
            placeholder="Data da aquisição"
            required
          />
        </div>
        <div class="row button">
          <button id="btn-save" type="submit">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import iProduct from "@/domain/iProduct";
import API from "@/domain/api";
import { reactive, toRefs } from "@vue/reactivity";

export default {
  name: "NewProduct",

  setup() {
    const data = reactive({
      product: {} as iProduct,
    });

    async function saveProduct() {
      const response = await API.save(data.product);
      console.log(response);
      return response;
    }

    return {
      ...toRefs(data),
      saveProduct,
    };
  },
};
</script>

<style scoped>
::selection {
  background: rgba(26, 188, 156, 0.3);
}
.wrapper {
  min-width: 500px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.1);
}

.title {
  height: 80px;
  background: #16a085;
  border-radius: 5px 5px 0 0;
  color: #fff;
  font-size: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  padding: 30px 25px 25px 25px;
}
.row {
  height: 45px;
  margin-bottom: 15px;
}

input {
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 10px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  font-size: 16px;
  transition: all 0.3s ease;
}
input:focus {
  border-color: #16a085;
  box-shadow: inset 0px 0px 2px 2px rgba(26, 188, 156, 0.25);
}
form .row input::placeholder {
  color: #999;
}
.icons {
  position: absolute;
  width: 47px;
  height: 100%;
  color: #fff;
  font-size: 18px;
  background: #16a085;
  border: 1px solid #16a085;
  border-radius: 5px 0 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#btn-save {
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  padding-left: 0px;
  background: #16a085;
  border: 1px solid #16a085;
  cursor: pointer;
  height: 100%;
  width: 100%;
  outline: none;
  transition: all 0.3s ease;
}
form .button input:hover {
  background: #12876f;
}
</style>