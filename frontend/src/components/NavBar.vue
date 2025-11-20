<script setup>
</script>

<template>
    <v-app-bar :elevation="3" :color="'var(--app-bar-color)'">
        <v-app-bar-title>Ecommerce</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
    </v-app-bar>
</template>

<style scoped lang="scss">
.v-app-bar {
    --app-bar-color: #fed99b;
}
</style>