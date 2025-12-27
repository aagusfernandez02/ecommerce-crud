<script setup>
import { useShoppingCartStore } from '@/stores/shoppingCart';

const shoppingCartStore = useShoppingCartStore();

</script>

<template>
    <div class="pa-3">
        <h1 class="text-center text-h4">Shopping cart</h1>
        <v-table density="comfortable" class="mt-5">
            <thead>
                <tr>
                    <th colspan="1"></th>
                    <th class="text-center">Product</th>
                    <th class="text-center">Quantity</th>
                    <th class="text-center">Price</th>
                    <th colspan="1"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in shoppingCartStore.items" :key="item.id">
                    <td class="pa-0">
                        <img :src="item.image_url" class="productImage" :alt="`Image of ${item.name}`"/>
                    </td>
                    <td class="text-center">
                        <p class>{{ item.name }}</p>
                    </td>
                    <td class="text-center">
                        <v-row justify="space-around" align="center" class="px-2">
                            <v-btn icon="mdi mdi-minus" variant="tonal" size="x-small" color="red" class="mr-1" :disabled="item.quantity<=1" @click="shoppingCartStore.decreaseQuantity(item.id, 1)"/>
                            <p class="text-center">{{ item.quantity }}</p>
                            <v-btn icon="mdi mdi-plus" variant="tonal" size="x-small" color="success" class="ml-1" @click="shoppingCartStore.increaseQuantity(item.id, 1)"/>
                        </v-row>
                    </td>
                    <td class="text-center">
                        <p class="text-center">${{ item.price * item.quantity }}</p>
                    </td>
                    <td class="pa-0">
                        <v-btn icon="mdi mdi-close" class="deleteRowIcon" size="x-small" variant="plain" color="red" @click="shoppingCartStore.deleteItem(item.id)"/>   
                    </td>
                </tr>
                <tr>
                    <td colspan="3"></td>
                    <td class="text-center">
                        <p class="text-center font-weight-bold">${{ shoppingCartStore.totalPrice }}</p>
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </v-table>
        <div class="d-flex justify-space-between align-center mx-5 mt-10">
            <v-btn prepend-icon="mdi mdi-cancel" color="green" variant="outlined" @click="shoppingCartStore.clearShoppingCart()">Clear</v-btn>
            <v-btn prepend-icon="mdi mdi-skip-forward" color="green">Checkout</v-btn>
        </div>
    </div>
</template>

<style scoped lang="scss">
.productImage {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>