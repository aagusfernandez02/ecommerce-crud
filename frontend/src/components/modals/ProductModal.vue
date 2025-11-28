<script setup>
import { api } from '@/services/api';
import { useGlobalStore } from '@/stores/global';
import { useModalStore } from '@/stores/modal';
import { ref, watch } from 'vue';
import { toast } from 'vue3-toastify';

const modalStore = useModalStore();
const globalStore = useGlobalStore();

const placeholderUrl = 'https://placehold.jp/200?text=No+image';

// const name = ref('');
// const price = ref(0);
// const description = ref('');
// const imageUrl = ref('');
const currentImageSrc = ref(placeholderUrl);
const valid = ref(false);

const clearInputs = () => {
    modalStore.productData = {};
}

const handleSubmit = async () => {
    try {
        if (modalStore.mode == 'create') {
            // CREATE
            await api.post('/products', {
                name: modalStore.productData.name,
                price: modalStore.productData.price,
                description: modalStore.productData.description,
                image_url: modalStore.productData.image_url
            })
        } else if (modalStore.mode == 'edit') {
            // EDIT
            await api.put(`/products/${modalStore.productData.id}`, {
                name: modalStore.productData.name,
                price: modalStore.productData.price,
                description: modalStore.productData.description,
                image_url: modalStore.productData.image_url
            })
        }
    } catch (error) {
        console.error(error);
        toast.error(error.response.data.data.message);
    } finally {
        globalStore.isLoading = false;
        handleClose();
    }

}

const handleClose = () => {
    modalStore.mode = '';
    modalStore.productModal = false;
    modalStore.productData = {};
}

// Rules
const requiredRule = [
    v => !!v || 'This field is required'
];
const urlRule = [
  v => !v || /^https?:\/\/.+\..+/.test(v) || 'Must be a valid URL'
];
const priceRule = [
    v => !v || v > 0 || 'Must be greater than 0',
    v => !!v || 'This field is required'
]


// Watchers
watch(() => modalStore.productData.image_url, (newUrl) => {
    currentImageSrc.value = newUrl && newUrl.trim() ? newUrl : placeholderUrl;
});
</script>

<template>
    <!-- Create product modal -->
    <v-dialog class="modal" @after-leave="clearInputs">
        <v-card class="px-4 py-2">
            <v-card-title class="text-center text-h5" v-if="modalStore.mode == 'create'">Crear producto</v-card-title>
            <v-card-title class="text-center text-h5" v-if="modalStore.mode == 'edit'">Editar producto</v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <v-row dense>
                        <v-col cols="6">
                            <v-text-field label="Nombre" v-model="modalStore.productData.name" type="text" clearable :rules="requiredRule"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Descripción" v-model="modalStore.productData.description" type="text"
                                clearable :rules="requiredRule"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="5">
                            <v-row dense>
                                <img :src="currentImageSrc" class="productImage"
                                    @error="currentImageSrc = placeholderUrl" />
                            </v-row>
                        </v-col>
                        <v-col cols="7" class="pl-4">
                            <v-row dense>
                                <v-text-field label="URL Imagen" v-model="modalStore.productData.image_url" type="text"
                                    clearable :rules="urlRule"></v-text-field>
                            </v-row>
                            <v-row dense>
                                <v-text-field label="Precio" v-model="modalStore.productData.price" type="number" :rules="priceRule">$</v-text-field>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-between">
                <v-btn color="red" variant="tonal" @click="handleClose">Cancelar</v-btn>
                <v-btn color="green" variant="tonal" @click="handleSubmit" :disabled="!valid" v-if="modalStore.mode == 'create'">Crear</v-btn>
                <v-btn color="green" variant="tonal" @click="handleSubmit" :disabled="!valid" v-if="modalStore.mode == 'edit'">Editar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped lang="scss">
.modal {
    @include modal(800px);

    .productImage {
        object-fit: contain;
        width: 100%;
    }
}
</style>