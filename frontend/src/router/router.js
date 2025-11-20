import Products from '@/views/Products.vue';
import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    { path: '/products', component: Products },
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