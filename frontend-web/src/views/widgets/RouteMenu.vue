<template>
  <div>
    <v-label v-for="appRoute in appRoutes">
      <button @click="$router.push(appRoute.path)" class="button-item">
        <v-icon>mdi-arrow-right</v-icon>
        {{ appRoute.name }} 
      </button>
    </v-label>
  </div>
</template>

<script lang="ts" setup>
import { DomStcRoute, RouteStore } from "@/store/route-store";
import { computed } from "@vue/reactivity";

const appRoutes = computed<DomStcRoute[]>(() => RouteStore.state.routes.value);
</script>

<style scoped>
.button-item {
    color: aqua;
    margin-right: 8px;
}
</style>
