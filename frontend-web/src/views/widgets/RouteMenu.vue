<template>
    <div>
        <v-label v-for="appRoute in appRoutes">
            <button @click="$router.push(appRoute.path)">
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