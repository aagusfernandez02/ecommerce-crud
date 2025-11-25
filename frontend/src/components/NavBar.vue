<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const handleLogout = () => {
  userStore.logout();
};
</script>

<template>
  <v-app-bar :elevation="3" :color="'var(--app-bar-color)'" class="appbar">
    <v-app-bar-title>Ecommerce</v-app-bar-title>

    <template v-slot:append>
      <!-- <v-btn icon>
            <v-icon size="x-large">mdi-account-circle</v-icon>
          </v-btn> -->
      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon size="x-large">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            {{ userStore.user?.username }}
          </v-list-item>
          <v-list-item class="mouse-hover-click border-t-md">
            <v-list-item-title @click="handleLogout"><v-icon class="mr-2">mdi-logout</v-icon>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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

.mouse-hover-click {
  &:hover {
    cursor: pointer;
  }
}
</style>