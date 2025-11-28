<script setup>
import Navbar from '@/components/NavBar.vue';
import { useRoute } from 'vue-router';
import { useGlobalStore } from './stores/global';
import ProductModal from './components/modals/ProductModal.vue';
import { useModalStore } from './stores/modal';

const route = useRoute();
const routesWithoutNavbar = ['/login'];

const globalStore = useGlobalStore();
const modalStore = useModalStore();
</script>

<template>
  <v-app>
    <Navbar v-if="!routesWithoutNavbar.includes(route.path)"/>
    <v-main>
      <RouterView/>
    </v-main>
  </v-app>

  <!-- Modals -->
  <ProductModal v-model="modalStore.productModal" />

  <!-- Loading spinner -->
  <v-overlay
      :model-value="globalStore.isLoading"
      class="align-center justify-center"
  >
    <v-progress-circular
      color="blue"
      size="100"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<style scoped lang="scss">
</style>
