<script setup>
import router from '@/router/router';
import { useModalStore } from '@/stores/modal'
import { useProductStore } from '@/stores/product';
import { useGlobalStore } from '@/stores/global';
import { onMounted } from 'vue';
import { useSwal } from '@/composables/useSwal';
import { toast } from 'vue3-toastify';


const modalStore = useModalStore();
const productsStore = useProductStore();
const globalStore = useGlobalStore();

const $swal = useSwal();

const handleOpenEditProductModal = (product) => {
    console.log("product")
    console.log(product)

    modalStore.productData = product;
    modalStore.mode = 'edit';
    modalStore.productModal = true;
}

const handleOpenCreationProductModal = () => {
    modalStore.mode = 'create';
    modalStore.productModal = true;
}

const handleGoBack = () => {
    router.push('/products');
}

const fetchProducts = async () => {
    globalStore.isLoading = true;
    await productsStore.fetchProducts();
    globalStore.isLoading = false;
}

const deleteProduct = async (id) => {
    try {
        globalStore.isLoading = true;
        const res = await productsStore.delete(id);
        if(res){
            toast.success('Product deleted successfully');
        }
    } catch (error) {
        toast.error(error.response.data.data.message);
    } finally {
        globalStore.isLoading = false;
    }
}

const handleDeleteProduct = (id, name) => {
    $swal.fire({
        title: `This action cannot be undone`,
        text: `Delete ${name}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteProduct(id);
        }
    });
}

const handleEditProduct = (product) => {
    console.log(`Edit product`)
    handleOpenEditProductModal(product);
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
            <v-btn size="x-large" @click="handleOpenCreationProductModal" prepend-icon="mdi-plus" color="green">ADD PRODUCT</v-btn>
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
                                <v-btn v-bind="props" color="blue" variant="tonal" icon="mdi-pencil" @click="handleEditProduct(product)" size="small"></v-btn>
                            </template>
                        </v-tooltip>
                    </td>
                    <td>
                        <v-tooltip text="Delete" location="top">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" color="red" variant="tonal" icon="mdi-delete" @click="handleDeleteProduct(product.id, product.name)" size="small"></v-btn>
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