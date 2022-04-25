<template>
    <div class="floating-actions">
        <v-card class="floating-actions-card" variant="contained-text">
            <div style="display: flex;">
                <slot></slot>
            </div>
        </v-card>
    </div>
</template>

<style>
.floating-actions {
    margin-bottom: 10px;
    display: flex;
    align-self: center;
    width: 100%;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
}

.floating-actions-card {
    justify-content: space-evenly;
    width: 80%;
    max-width: 800px;
    height: 50px;
    border-radius: 10px;
}

.floating-actions-card>div>div {
    flex: 1;
}

.floating-actions-card>div>div>button {
    height: 50px !important;
}
</style>