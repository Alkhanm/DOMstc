<template>
    <div>
        <v-label v-for="appRoute in appRoutes">
            <button class="button-item">
                <v-icon>mdi-arrow-right</v-icon>
            </button>
        </v-label>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { RouteRecordRaw } from "vue-router";
import router from "../../router";

interface AppRoute {
    name: string;
    action: () => void;
}

const appRoutes = computed(() => {
    const { currentRoute, options } = router;
    const paths = currentRoute.value.fullPath.split("/");
    const result: RouteRecordRaw[] = []
    options.routes.forEach(r => {
    console.log(paths, r)
       paths.forEach(path => {
           if (path === r.path.replaceAll("/", "")) {
               result.push(r)
           }
       })
    });
});
</script>

<style scoped>
.button-item {
    color: aqua;
    margin-right: 8px;
}
</style>
