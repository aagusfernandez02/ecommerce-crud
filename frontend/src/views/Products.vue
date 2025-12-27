<script setup>
import { useShoppingCartStore } from '@/stores/shoppingCart';
import ProductCard from '@/components/ProductCard.vue';
import { useProductStore } from '@/stores/product';
import { useGlobalStore } from '@/stores/global';
import { onMounted } from 'vue';

const productsStore = useProductStore();
const globalStore = useGlobalStore();
const shoppingCartStore = useShoppingCartStore();


onMounted(async () => {
    globalStore.isLoading = true;
    await productsStore.fetchProducts();
    globalStore.isLoading = false;
});

const handleClickProduct = (product) => {
    shoppingCartStore.addItem(product);
    shoppingCartStore.handleToggleShoppingCartDrawer();
}
</script>

<template>
    <main>
        <h1 class="text-h4 text-center pt-2">Productos</h1>
        
        <div class="products pt-4">
            <ProductCard 
                v-for="product in productsStore.products" 
                :key="product.id" 
                :imgSrc="product.image_url=='' ? 'https://placehold.jp/200?text=No+image' : product.image_url"
                :title="product.name"
                :description="product.description"
                :price="product.price"
                @addToCart="handleClickProduct(product)"
            />
        </div>
    </main>
</template>

<style scoped lang="scss">
main {
    @include main;

    .products {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: start;
        gap: 20px;
    }
}
</style>