import Products from '@/views/Products.vue';
import Login from '@/views/Login.vue';
import { createWebHistory, createRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import AdminPanel from '@/views/AdminPanel.vue';
import { toast } from 'vue3-toastify';
import { useGlobalStore } from '@/stores/global';

const routes = [
    { path: '/admin-panel', component: AdminPanel, meta: { requiresAuth: true, requiresAdmin: true } },
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

router.beforeEach(async (to, from) => {
    const userStore = useUserStore();
    const globalStore = useGlobalStore();
    globalStore.isLoading = true;

    try {
        const isLogged = await userStore.fetchUser();
    
        // Ruta protegida
        if (to.meta.requiresAuth && !isLogged) {
            return '/login';
        }
    
        // Ruta protegida + requiere admin
        if (to.meta.requiresAdmin) {
            if (userStore.user.role !== 'admin') {
                if(!isLogged){
                    return '/login';
                }
                return from.path;
            }
        }
    
        return true;
    } finally {
        globalStore.isLoading = false;
    }

});

export default router;