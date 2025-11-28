import { api } from "@/services/api";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import { useUserStore } from "./user";


export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      const userStore = useUserStore();

      try {
        const res = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${userStore.jwt}`
          }
        });
        const data = res.data?.data;
        this.products = data;
      } catch (error) {
        console.log(error)
        let errorMessage = error.response.data.msg;
        toast.error(errorMessage);
      }
    },
    async deleteProduct(id) {
      const userStore = useUserStore();

      try {
        const res = await api.delete(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${userStore.jwt}`
          }
        });
        const data = res.data;
        if (data.status == 'ok'){
          this.products = this.products.filter(product => product.id != id);
          return true; 
        }
      } catch (error) {
        let errorMessage = error.response.data.msg;
        toast.error(errorMessage);
      }
      return false;
    }
  }
})