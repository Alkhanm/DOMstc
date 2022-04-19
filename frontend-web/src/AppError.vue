<template>
    <v-snackbar v-model="visible" variant="text" multi-line timeout="50000" type="error">
        <v-alert class="alert" max-width="500px" :border="true" :border-color="AppAlert.color" >
            <v-alert-title :color="AppAlert.color" class="text-white">
                <v-icon class="mr-2">
                    {{ AppAlert.icon }}
                </v-icon>
                {{ AppAlert.title }}
            </v-alert-title>
            <span class="text-white w-100">
                {{ AppAlert.msg }}
            </span>
            <v-btn :color="AppAlert.color" variant="text" @click="visible = false">
                Fechar
            </v-btn>
        </v-alert>
    </v-snackbar>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { AlertStore } from "./store/alert-store";

interface AppAlert {
    title: string;
    msg: string;
    icon: string;
    color: string;
}

const visible = ref(false);
const alert = AlertStore.getters.getLast();
const AppAlert = reactive<AppAlert>({} as AppAlert)

function getAppAlertInfos() {
    const { msg, type } = alert.value
    AppAlert.msg = msg;
    if (type === "ERROR") {
        AppAlert.icon = "mdi-alert-outline";
        AppAlert.title = "Ops, houve um erro";
        AppAlert.color = "error";
    }
    if (type === "SUCCESS") {
        AppAlert.icon = "mdi-check-all";
        AppAlert.title = "Operação realizada";
        AppAlert.color = "success";
    }
    if (type === "WARNING") {
        AppAlert.icon = "mdi-alert-octagon-outline";
        AppAlert.color = "warning";
        AppAlert.title = "Atenção!";
    }
    if (type === "INFO") {
        AppAlert.icon = "mdi-chat-alert";
        AppAlert.color = "deep-purple accent-4";
        AppAlert.title = "Informação";
    }
}

watch(alert, () => {
    if (alert.value) {
        getAppAlertInfos();
        visible.value = true;
    }
})

</script>

<style>
.alert {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    align-items: flex-end;
}
</style>