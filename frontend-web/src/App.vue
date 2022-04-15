<template>
  <v-app theme="dark">
    <v-navigation-drawer app> navigation-drawer </v-navigation-drawer>
    <v-app-bar app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title> DomSTC </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-bottom-navigation></v-bottom-navigation>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style scoped>
</style>
