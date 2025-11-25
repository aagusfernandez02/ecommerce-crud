<script setup>
const props = defineProps({
    imgSrc: String,
    title: String,
    description: String,
    price: Number
})
</script>

<template>
    <v-card class="m-0 pb-2 card" max-width="300">
        <v-img class="align-end" height="200" :src="props.imgSrc" contain>
            <v-card-title>$ {{ props.price }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4">
            {{ props.title }}
        </v-card-subtitle>

        <v-card-text class="text-justify description">
            {{ props.description }}
        </v-card-text>

        <v-card-actions>
            <v-btn 
                color="#624CAB" 
                variant="tonal" 
                icon="mdi-cart-plus" 
                class="ml-auto mr-0"
            ></v-btn>
        </v-card-actions>
    </v-card>
</template>