<script setup>
import { useShoppingCartStore } from '@/stores/shoppingCart';

const shoppingCartStore = useShoppingCartStore();

</script>

<template>
    <div class="pa-3">
        <h1 class="text-center text-h4">Shopping cart</h1>
        <v-col>
            <v-row v-for="item in shoppingCartStore.items" :key="item.id" justify="center" align="center">
                <v-col cols="2">
                    <img :src="item.image_url" class="productImage" :alt="`Image of ${item.name}`"/>
                </v-col>
                <v-col cols="4">
                    <p class="text-center">{{ item.name }}</p>
                </v-col>
                <v-col cols="4">
                    <v-btn icon="mdi mdi-minus" variant="tonal" size="x-small" color="red" class="mr-1" :disabled="item.quantity<=1" @click="shoppingCartStore.decreaseQuantity(item.id, 1)"/>
                    {{ item.quantity }}
                    <v-btn icon="mdi mdi-plus" variant="tonal" size="x-small" color="success" class="ml-1" @click="shoppingCartStore.increaseQuantity(item.id, 1)"/>
                </v-col>
                <v-col cols="2">
                    ${{ item.price * item.quantity }}
                </v-col>
            </v-row>
        </v-col>
    </div>
</template>

<style scoped lang="scss">
.productImage {
    width: 100px;
    height: 100px;
    object-fit: contain;
}
</style>