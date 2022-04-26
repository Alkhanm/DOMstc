<template>
  <v-app theme="dark">
    <v-app-bar app>
      <v-app-bar-nav-icon variant="text" @click="changeDrawer" />
      <v-app-bar-title id="title">
        <div>
          <div>
            DomSTC
          </div>
          <RouteMenu />
        </div>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid class="flex" style="height: 100%; max-width: 1200px;">
        <router-view />
      </v-container>
    </v-main>
    <v-navigation-drawer permanent v-model="drawer">
      <v-list nav>
        <v-list-item @click="$router.push('/')" prepend-icon="mdi-home" title="INICIO" value="home" />
        <v-list-item @click="$router.push('/products')" prepend-icon="mdi-cart" title="PRODUTOS" value="products" />
        <v-list-item @click="$router.push('/sales')" prepend-icon="mdi-cart-arrow-down" title="VENDAS" value="sales" />
      </v-list>
    </v-navigation-drawer>
    <AppAlert />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppAlert from "./AppAlert.vue";
import RouteMenu from "./views/widgets/RouteMenu.vue";


const drawer = ref(true);

function changeDrawer() {
  drawer.value = !drawer.value;
}
</script>

<style>
#title {
  text-align: center;
  font-size: xx-large;
}
</style>
