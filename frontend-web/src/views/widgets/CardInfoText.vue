<template>
  <div class="info" variant="contained-text" :border="true" right>
    <p class="info-text">{{ text }}</p>
    <p class="info-value">{{ value }}</p>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  text: string;
  value: any;
}

defineProps<Props>();
</script>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #cfc6c6;
  background-color: #393939;
  padding: 10px;
  min-width: 170px;
  height: 70px;
  border-radius: 10px;
  border-left-style: solid;
  border-left-width: 8px;
  border-left-color: #616161;
  margin: 5px;
}

.info-text {
  font-size: medium;
  font-weight: bolder;
  margin-bottom: 2px;
}

.info-value {
  font-size: medium;
}
</style>
