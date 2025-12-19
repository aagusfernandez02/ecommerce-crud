<script setup>
const props = defineProps({
    imgSrc: String,
    title: String,
    description: String,
    price: Number
})

defineEmits(['addToCart'])
</script>

<template>
    <v-card class="m-0 pb-2 card" max-width="300">
        <v-img class="align-end" height="200" :src="props.imgSrc" contain>
        </v-img>
        <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ props.title }}
        </v-card-title>

        <v-card-subtitle class="text-subtitle-2">
            $ {{ props.price }}
        </v-card-subtitle>

        <v-card-text class="text-justify description">
            <p>{{ props.description }}</p>
        </v-card-text>

        <v-card-actions>
            <v-btn 
                color="#624CAB" 
                variant="tonal" 
                icon="mdi-cart-plus" 
                class="ml-auto mr-0"
                @click="$emit('addToCart')"
            ></v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped>
.v-card {
    width: 300px; 
    max-height: 500px;

    .v-card-text {
        p {
            @include text-clamp(3);
        }
    }
}
</style>