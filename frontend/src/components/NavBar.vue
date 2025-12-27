<script setup>
import router from '@/router/router';
import { useGlobalStore } from '@/stores/global';
import { useShoppingCartStore } from '@/stores/shoppingCart';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import NavigationDrawer from './NavigationDrawer.vue';
import { toast } from 'vue3-toastify';

const userStore = useUserStore();
const globalStore = useGlobalStore();
const shoppingCartStore = useShoppingCartStore();

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
  <v-navigation-drawer v-model="shoppingCartStore.navigationDrawerOpen" temporary :location="$vuetify.display.mobile ? 'bottom' : 'right'" width="600">
    <NavigationDrawer />
  </v-navigation-drawer>

  <v-app-bar :elevation="3" :color="'var(--app-bar-color)'" class="appbar">
    <v-app-bar-title>Ecommerce</v-app-bar-title>

    <template v-slot:append>
      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }" v-if="$vuetify.display.mobile">
          <v-btn icon="mdi-account-circle" v-bind="props" size="x-large"></v-btn>
        </template>
        <template v-slot:activator="{ props }" v-else>
          <v-btn append-icon="mdi-account-circle" v-bind="props" size="x-large">
            {{ userStore.user?.username }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="userStore.user?.role == 'admin'" class="mouse-hover-click">
            <v-list-item-title @click="handleAdminPanel"><v-icon class="mr-2">mdi-security</v-icon>Admin
              Panel</v-list-item-title>
          </v-list-item>
          <v-list-item class="mouse-hover-click border-t-md">
            <v-list-item-title @click="handleLogout"><v-icon class="mr-2">mdi-logout</v-icon>Sign
              Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn class="text-none ml-2" stacked @click="shoppingCartStore.handleToggleShoppingCartDrawer">
        <v-badge color="error" :content="shoppingCartStore.totalProducts">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
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
  background-image: url('../assets/images/light-background-1.png') !important; // https://app.haikei.app/
  background-repeat: repeat !important;
}

.mouse-hover-click {
  &:hover {
    cursor: pointer;
  }
}
</style>