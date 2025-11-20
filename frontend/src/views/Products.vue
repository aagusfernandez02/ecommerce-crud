<script setup>
import ProductCard from '@/components/ProductCard.vue';

const productos = [
    { id: 1, nombre: 'Mochila', precio: 50000, stock: 10 },
    { id: 2, nombre: 'Cartera', precio: 60000, stock: 12 },
    { id: 3, nombre: 'Bolsas de consorcio', precio: 1000, stock: 8 },
    { id: 4, nombre: 'PlayStation 5', precio: 1000000, stock: 20 },
    { id: 5, nombre: 'Xbox One', precio: 800000, stock: 15 },
    { id: 6, nombre: 'Termo Stanley 0.8 L', precio: 65000, stock: 5 },
]
</script>

<template>
    <main>
        <h1>Productos</h1>
        
        <div class="products">
            <ProductCard 
                imgSrc="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
                title="Dados transparentes"
            />
            <ProductCard 
                imgSrc="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
                title="Dados transparentes"
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