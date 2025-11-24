<script setup>
import { ref } from 'vue';
import { login } from '@/services/api';

const valid = ref(false);
const username = ref('');
const password = ref('');
const showPassword = ref(false);

const usernameRule = [
    v => !!v || 'Username is required',
    v => v.length >= 4 || 'Username must be at least 4 characters'
];

const passwordRule = [
    v => !!v || 'Password is required',
    v => v.length >= 6 || 'Password must be at least 6 characters'
];

const handleSubmit = async () => {
    console.log("Handle submit!")
    await login(username.value, password.value);
}

const handleShowPasswordClick = () => {
    showPassword.value = !showPassword.value;
}
</script>

<template>
    <main>
        <v-card class="login-card">
            <v-card-title class="text-center pb-2">Bienvenido al ecommerce</v-card-title>
            <v-card-subtitle class="text-center pb-5">Ingrese su usuario y contraseña para iniciar
                sesión</v-card-subtitle>
            <v-card-text>
                <v-form v-model="valid">
                    <v-row class="px-3">
                        <v-text-field v-model="username" :rules="usernameRule" label="Username" clearable
                            clear-icon="mdi-close"></v-text-field>
                    </v-row>
                    <v-row class="px-3 pt-1">
                        <v-text-field v-model="password" :rules="passwordRule" label="Password" clearable clear-icon="mdi-close" :type="showPassword ? 'text' : 'password'">
                            <template v-slot:append >
                                <v-icon @click="handleShowPasswordClick">
                                    {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                                </v-icon>
                            </template>
                        </v-text-field>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="!valid" @click="handleSubmit" color="#624CAB" variant="tonal"
                    class="ml-auto mr-0">Iniciar
                    sesión</v-btn>
            </v-card-actions>
        </v-card>
    </main>
</template>

<style scoped lang="scss">
main {
    height: 100%;
    background: #A0DDFF;
    background: radial-gradient(circle, rgba(160, 221, 255, 1) 0%, rgba(176, 214, 255, 1) 75%, rgba(193, 206, 254, 1) 100%);

    display: flex;
    justify-content: center;
    align-items: center;

    .login-card {
        width: 500px;
        padding: 10px;

        border-radius: 5px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
}
</style>