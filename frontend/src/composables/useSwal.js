import { inject, getCurrentInstance } from 'vue';

export const useSwal = () => {
    const injected = inject('$swal');
    if (injected) return injected;

    const { appContext } = getCurrentInstance();
    return appContext.config.globalProperties.$swal;
}