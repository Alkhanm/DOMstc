<template>
    <v-card class="card-info" >
        <div class="card-info-icon">
            <v-icon size="x-large" color="white">{{ icon }}</v-icon>
        </div>
        <div class="card-info-texts">
            <p class="card-info-text">{{ text }}</p>
            <p style="align-self: flex-end;">{{ value }}</p>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
interface Props {
    icon: string;
    text: string;
    value: any;
}
defineProps<Props>();

</script>

<style scoped>
.card-info {
    display: flex;
    justify-content: end;
    padding: 10px;
    position: relative;
    width: 150px;
    max-height: 60px;
    border-radius: 10px;
}

.card-info-icon {
    position: absolute;
    left: 5px;
    top: -10px;
    background-color: rgb(56, 56, 56);
    width: 60px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}

.card-info-texts {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
}

.card-info-text {
    font-size: medium;
    font-weight: bolder;
    margin-bottom: 2px;
    text-align: end;
}
</style>