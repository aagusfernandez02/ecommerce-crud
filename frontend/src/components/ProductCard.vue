<script setup>
const props = defineProps({
    imgSrc: String,
    title: String,
})
</script>

<template>
    <v-card class="m-0 pb-2 card" max-width="300">
        <v-img class="align-end" height="200" :src="props.imgSrc" cover>
            <v-card-title>{{ props.title }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4">
            Vendedor
        </v-card-subtitle>

        <v-card-text class="text-justify description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis deserunt laudantium nulla, ullam dolore voluptate reiciendis, alias dicta debitis suscipit quod iste eveniet dolores aliquam quam distinctio, repellendus temporibus vitae!
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