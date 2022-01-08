<template>
  <div class="container grid-lg">
    <h2>Lista de Produtos</h2>
    <div class="container-delete-all">
      <button id="bt-delete-all">APAGAR</button>
    </div>
    <table class="styled-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço de Compra</th>
          <th>Preço para venda</th>
          <th>Marca</th>
          <th>Data de aquisição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody class="active-row">
        <tr v-for="prod in list" :key="prod.id">
          <td>{{ prod.name }}</td>
          <td>R$ {{ prod.purchasePrice }}</td>
          <td>R$ {{ prod.salePrice }}</td>
          <td>{{ prod.brand }}</td>
          <td>{{ prod.acquisitionDate }}</td>
          <td class="td-actions">
            <button class="bt">EDITAR</button>
            <button @click="deleteProduct(prod.id)" class="bt">DELETAR</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import iProduct from "@/domain/iProduct";
import { PropType } from "@vue/runtime-core";
import API from "@/domain/api";

export default {
  name: "ProductList",
  props: {
    list: {
      type: [] as PropType<iProduct[]>,
      required: true,
    },
  },
  setup() {
    async function deleteProduct(id: number) {
      await API.deleteProduct(id);
    }

    return {
      deleteProduct,
    };
  },
};
</script>

<style scoped>
.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  min-width: 800px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: center;
}

.styled-table th,
.styled-table td {
  padding: 12px 1dpx;
  padding: 30px;
}

.styled-table tr {
  border-bottom: 1px solid #dddddd;
  padding: 10px;
}

.styled-table tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.active-row :hover {
  color: #009879;
  cursor: pointer;
}
.td-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: rgb(99, 96, 96);
  margin: none;
  padding: none;
}
.td-actions :hover {
  color: rgb(99, 96, 96);
}
.bt {
  display: flex;
  justify-content: center;
  width: 80px;
  padding: none;
  margin: 5px;
}
.icon {
  font-size: 18px;
}
.container-delete-all {
  display: flex;
  justify-content: right;
}
#bt-delete-all {
  display: flex;
  justify-content: center;
  width: 80px;
  padding: none;
  margin: 5px;
}
</style>
