<script setup>
import Navbar from '@/components/NavBar.vue';

</script>

<template>
  <v-app>
    <Navbar />
    <v-main>
      <RouterView class="mainContent"/>
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">
.mainContent {
  padding: 10px;
}
</style>
