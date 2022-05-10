<template>
    <v-card class="info">
        <div class="info-icon">
            <v-icon size="x-large" color="white">{{ icon }}</v-icon>
        </div>
        <div class="info-texts">
            <p class="info-text">{{ text }}</p>
            <p class="info-value">{{ value }}</p>
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
.info {
    display: flex;
    flex-direction: row;
    padding: 10px;
    justify-content: flex-end;
    position: relative;
    width: 180px;
    max-height: 90px;
    border-radius: 10px;
}

.info-icon {
    position: absolute;
    left: 5px;
    top: -10px;
    background-color: rgb(44, 43, 43);
    width: 60px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}


.info-texts {
    display: flex;
    flex-direction: column;
    margin-top: 25px;
}

.info-text {
    font-size: medium;
    font-weight: bolder;
    margin-bottom: 2px;
    text-align: end;
}

.info-value {
    align-self: flex-end;
}

@media screen and (max-width: 820px) {
    .info-icon {
        display: none;
    }

    .info-texts {
        display: flex;
        flex: 1;
        justify-content: start;
        align-items: flex-start;
    }

    .info-text {
        align-self: flex-start;
    }

    .info-value {
        align-self: flex-start;
    }
}

@media screen and (min-width: 1100px) {
    .info {
        display: flex;
        justify-content: end;
        padding: 10px;
        position: relative;
        width: 250px;
        max-height: 60px;
        border-radius: 10px;
    }
}
</style>