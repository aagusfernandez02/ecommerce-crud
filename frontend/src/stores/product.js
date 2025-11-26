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

      console.log("Fetching products...")
      try {
        const res = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${userStore.jwt}`
          }
        });
        const data = res.data?.data;
        this.products = data;
      } catch (error) {
        let errorMessage = error.response.data.data.message;
        toast.error(errorMessage);
      }
    }
  }
})