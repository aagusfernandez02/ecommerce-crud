<script setup>
import router from '@/router/router';
import { useGlobalStore } from '@/stores/global';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const globalStore = useGlobalStore();

const handleAdminPanel = () => {
  router.push('/admin-panel');
}

const handleLogout = async () => {
  globalStore.isLoading = true;
  await userStore.logout();
  globalStore.isLoading = false;
};
</script>

<template>
  <v-app-bar :elevation="3" :color="'var(--app-bar-color)'" class="appbar">
    <v-app-bar-title>Ecommerce</v-app-bar-title>
    
    <template v-slot:append>
      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn append-icon="mdi-account-circle" v-bind="props" size="x-large">
            {{ userStore.user?.username }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="userStore.user?.role == 'admin'" class="mouse-hover-click">
            <v-list-item-title @click="handleAdminPanel"><v-icon class="mr-2">mdi-security</v-icon>Admin Panel</v-list-item-title>
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