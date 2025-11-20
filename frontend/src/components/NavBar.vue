<script setup>
</script>

<template>
    <v-app-bar :elevation="3" :color="'var(--app-bar-color)'" class="appbar">
        <v-app-bar-title>Ecommerce</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon>
            <v-icon size="x-large">mdi-account-circle</v-icon>
          </v-btn>
        </template>
    </v-app-bar>
</template>

<style scoped lang="scss">
.v-app-bar {
    --app-bar-color: #A0DDFF;
}

.appbar {
  z-index: $z-index-app-bar !important;
  height: $app-bar-height !important;
}
</style>