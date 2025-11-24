import Products from '@/views/Products.vue';
import Login from '@/views/Login.vue';
import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    { path: '/products', component: Products },
    { path: '/login', component: Login },
    {
        path: '/:pathMatch(.*)*', // Catch unmatched routes
        redirect: '/products'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;