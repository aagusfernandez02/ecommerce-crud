<script setup>
import { api } from '@/services/api';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import { ref, watch } from 'vue';

const modalStore = useModalStore();
const userStore = useUserStore();

const placeholderUrl = 'https://placehold.jp/200?text=No+image';

const name = ref('');
const price = ref(0);
const description = ref('');
const imageUrl = ref('');
const currentImageSrc = ref(placeholderUrl);
const valid = ref(false);

const clearInputs = () => {
    name.value = '';
    price.value = 0;
    description.value = '';
    imageUrl.value = '';
}

const handleSubmit = async () => {
    try {
        await api.post('/products', {
            name: name.value,
            price: price.value,
            description: description.value,
            image_url: imageUrl.value
        }, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })
    } catch (error) {
        console.error(error);
    }

    modalStore.createProduct = false;
}

const handleClose = () => {
    modalStore.createProduct = false;
}

// Rules
const requiredRule = [
    v => !!v || 'This field is required'
];
const urlRule = [
  v => !v || /^https?:\/\/.+\..+/.test(v) || 'Must be a valid URL'
];

// Watchers
watch(price, () => {
    if (price.value == null || price.value == '' || price.value < 0) {
        price.value = 0;
    }
})

watch(imageUrl, (newUrl) => {
    currentImageSrc.value = newUrl && newUrl.trim() ? newUrl : placeholderUrl;
});
</script>

<template>
    <!-- Create product modal -->
    <v-dialog v-model="modalStore.createProduct" class="modal" @after-leave="clearInputs">
        <v-card class="px-4 py-2">
            <v-card-title class="text-center text-h5">Crear producto</v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <v-row dense>
                        <v-col cols="6">
                            <v-text-field label="Nombre" v-model="name" type="text" clearable :rules="requiredRule"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Descripción" v-model="description" type="text"
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
                                <v-text-field label="URL Imagen" v-model="imageUrl" type="text"
                                    clearable :rules="urlRule"></v-text-field>
                            </v-row>
                            <v-row dense>
                                <v-text-field label="Precio" v-model="price" type="number">$</v-text-field>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-between">
                <v-btn color="red" variant="tonal" @click="handleClose">Cancelar</v-btn>
                <v-btn color="green" variant="tonal" @click="handleSubmit" :disabled="!valid">Crear</v-btn>
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