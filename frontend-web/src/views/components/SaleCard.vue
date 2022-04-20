<template>
    <v-card class="mx-auto">
        <v-card-title>
            Top western road trips
        </v-card-title>
        <v-card-subtitle class="mb-2">
            1,000 miles of wonder
        </v-card-subtitle>
        <v-expand-transition>
            <div v-show="expand">
                <v-divider></v-divider>
                <v-card-text>
                    I'm a thing. But, like most politicians, he promised more than he could deliver. You won't
                    have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go
                    with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do
                    his laundry? I've got to find a way to escape.
                </v-card-text>
            </div>
        </v-expand-transition>
        <v-card-actions>
            <v-btn :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="expand = !expand"></v-btn>
            <v-spacer></v-spacer>
            <v-btn color="orange-lighten-2" variant="text">
                Explore
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

const expand = ref(false);

</script>