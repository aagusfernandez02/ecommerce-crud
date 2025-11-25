<script setup>
import ProductCard from '@/components/ProductCard.vue';
import { useGlobalStore } from '@/stores/global';
import { useProductStore } from '@/stores/product';
import { onMounted } from 'vue';

const productsStore = useProductStore();
const globalStore = useGlobalStore();


onMounted(async () => {
    globalStore.isLoading = true;
    await productsStore.fetchProducts();
    globalStore.isLoading = false;

    console.log(productsStore.products)
})
</script>

<template>
    <main>
        <h1>Productos</h1>
        
        <div class="products">
            <ProductCard 
                v-for="product in productsStore.products" 
                :key="product.id" 
                :imgSrc="product.image_url=='' ? 'https://placeholder.pics/svg/300' : product.image_url"
                :title="product.name"
                :description="product.description"
                :price="product.price"
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