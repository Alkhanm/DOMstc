<template>
    <v-card class="info" variant="contained-text">
        <div class="info-texts">
            <p class="info-text">{{ text}}</p>
            <p class="info-value">{{ value }}</p>
        </div>
    </v-card>
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
    padding: 10px;
    width: 170px;
    height: 70px;
    border-radius: 10px;
    justify-content: center;
}

.info-texts {
    display: flex;
    width: 100%;
    flex-direction: column;
}

.info-text {
    font-size: medium;
    font-weight: bolder;
    margin-bottom: 2px;
    text-align: left;
}

.info-value {
    width: 100%;
    align-self: flex-start;
    font-size: medium;
    text-align: right;
}
</style>