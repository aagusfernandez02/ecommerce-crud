<script setup>
import Navbar from '@/components/NavBar.vue';
import { useRoute } from 'vue-router';
import { useGlobalStore } from './stores/global';

const route = useRoute();
const routesWithoutNavbar = ['/login'];

const globalStore = useGlobalStore();
</script>

<template>
  <v-app>
    <Navbar v-if="!routesWithoutNavbar.includes(route.path)"/>
    <v-main>
      <RouterView/>
    </v-main>
  </v-app>

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
