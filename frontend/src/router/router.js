import Products from '@/views/Products.vue';
import Login from '@/views/Login.vue';
import { createWebHistory, createRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const routes = [
    { path: '/products', component: Products, meta: { requiresAuth: true } },
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

router.beforeEach((to, from) => {
    if( to.meta.requiresAuth ) {
        const userStore = useUserStore();
        if( userStore.getJwt() != null ) {
            return true;
        }
        return { path: '/login' }
    }
});

export default router;