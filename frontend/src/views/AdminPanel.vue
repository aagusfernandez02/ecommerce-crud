<script setup>
import router from '@/router/router';
import { useModalStore } from '@/stores/modal'
import { useProductStore } from '@/stores/product';
import { useGlobalStore } from '@/stores/global';
import { onMounted } from 'vue';


const modalStore = useModalStore();
const productsStore = useProductStore();
const globalStore = useGlobalStore();

const handleOpenCreationProductModal = () => {
    modalStore.createProduct = true;
}

const handleGoBack = () => {
    router.push('/products');
}

const fetchProducts = async () => {
    globalStore.isLoading = true;
    await productsStore.fetchProducts();
    globalStore.isLoading = false;
}

const handleDeleteProduct = (id) => {
    console.log(`Delete product: ${id}`)
}

const handleEditProduct = (id) => {
    console.log(`Edit product: ${id}`)
}

// Lifecycle
onMounted(async ()=>{
    if (productsStore.products.length == 0) {
        await fetchProducts();
    }
});
</script>

<template>
    <main>
        <v-btn icon="mdi-chevron-left" variant="plain" size="x-large" @click="handleGoBack" class="backIcon"/>

        <h1 class="text-h4 text-center pt-2">Admin panel</h1>

        <v-row justify="end" align="center" class="mr-5">
            <v-btn size="x-large" @click="handleOpenCreationProductModal" prepend-icon="mdi-plus" color="green">CREAR PRODUCTO</v-btn>
        </v-row>

        <v-table class="mt-10">
            <thead>
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Description</th>
                    <th class="text-left">Price</th>
                    <th class="text-left">Image</th>
                    <th colspan="2"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in productsStore.products">
                    <td>{{ product.name }}</td>
                    <td>
                        <p class="productDescription">{{ product.description }}</p>
                    </td>
                    <td>${{ product.price }}</td>
                    <td class="imageColumn">
                        <img :src="product.image_url || 'https://placehold.jp/200?text=No+image'"/>
                    </td>
                    <td>
                        <v-tooltip text="Edit" location="top">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" color="blue" variant="tonal" icon="mdi-pencil" @click="handleEditProduct(product.id)" size="small"></v-btn>
                            </template>
                        </v-tooltip>
                    </td>
                    <td>
                        <v-tooltip text="Delete" location="top">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" color="red" variant="tonal" icon="mdi-delete" @click="handleDeleteProduct(product.id)" size="small"></v-btn>
                            </template>
                        </v-tooltip>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </main>
</template>

<style scoped lang="scss">
main {
    @include main;
    position: relative;

    .backIcon {
        position: absolute;
        top: 0;
        left: 0;

        animation: bounceBackIcon .75s cubic-bezier(0.7, 0, 0.84, 0) 0s infinite alternate-reverse none;
    }
}

@keyframes bounceBackIcon {
	0% {
		transform: translateX(0%)
	}

	100% {
		transform: translateX(-5%);
	}
}

.productDescription {
    @include text-clamp(2);
}

.imageColumn {
    img {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }
}
</style>