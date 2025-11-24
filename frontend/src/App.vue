<script setup>
import Navbar from '@/components/NavBar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routesWithoutNavbar = ['/login'];
</script>

<template>
  <v-app>
    <Navbar v-if="!routesWithoutNavbar.includes(route.path)"/>
    <v-main>
      <RouterView/>
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">

</style>
