<script setup>
import router from '@/router/router';
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();

const handleOpenCreationProductModal = () => {
    modalStore.createProduct = true;
}

const handleGoBack = () => {
    router.push('/products');
}
</script>

<template>
    <main>
        <v-btn icon="mdi-chevron-left" variant="plain" size="x-large" @click="handleGoBack" class="backIcon"/>

        <h1 class="text-h4 text-center pt-2">Admin panel</h1>

        <v-btn size="x-large" @click="handleOpenCreationProductModal" prepend-icon="mdi-plus" color="green">CREAR PRODUCTO</v-btn>
<!-- 
        <v-table class="mt-10">
            <thead>
                <tr>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Calories
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nombre 1</td>
                    <td>1000</td>
                </tr>
                <tr>
                    <td>Nombre 2</td>
                    <td>2000</td>
                </tr>
                <tr>
                    <td>Nombre 3</td>
                    <td>3000</td>
                </tr>
                <tr>
                    <td>Nombre 4</td>
                    <td>4000</td>
                </tr>
            </tbody>
        </v-table> -->
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
</style>