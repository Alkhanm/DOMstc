<template>
  <v-card class="page-card" @click="$router.push(link)">
    <v-icon size="40" color="white">{{ icon }}</v-icon>
    <p class="info-value">{{ title }}</p>
  </v-card>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
  link: string;
  icon: string;
}
defineProps<Props>();
</script>

<style scoped>
.page-card {
  width: 170px;
  height: 80px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.info-value {
  font-weight: bold;
  text-transform: uppercase;
}
</style>
