import Products from '@/views/Products.vue';
import Login from '@/views/Login.vue';
import { createWebHistory, createRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import AdminPanel from '@/views/AdminPanel.vue';
import { toast } from 'vue3-toastify';

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

router.beforeEach((to, from) => {
    const userStore = useUserStore();        

    // Requiere admin
    if( to.meta.requiresAdmin ) {
        if( userStore.jwt != null && userStore.user != null ) {
            if( userStore.user.role == 'admin' ) {
                return true;
            }
            return false;
        }


        return { path: '/login' }
    }
    
    // Requiere auth
    if( to.meta.requiresAuth ) {
        if( userStore.jwt != null ) {
            return true;
        }

        return { path: '/login' }
    }
});

export default router;