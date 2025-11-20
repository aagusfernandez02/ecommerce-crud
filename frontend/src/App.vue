<script setup>
import Navbar from '@/components/NavBar.vue';

</script>

<template>
  <v-app>
    <Navbar />
    <v-main>
      <RouterView/>
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">

</style>
