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
        const res = await api.get('/products');
        const data = res.data?.data;
        this.products = data;
      } catch (error) {
        console.log(error)
        let errorMessage = error.response.data.msg;
        toast.error(errorMessage);
      }
    },
    async delete(id) {
      const res = await api.delete(`/products/${id}`);
      const data = res.data;
      if (data.status == 'ok'){
        this.products = this.products.filter(product => product.id != id);
      }
    },
    async create(data) {
      let res = await api.post('/products', {
          name: data.name,
          price: data.price,
          description: data.description,
          image_url: data.image_url
      });
      
      this.products.push(res.data.data.data);
    },
    async update(id, data) {
      let res = await api.put(`/products/${id}`, data);

      let index = this.products.findIndex(product => product.id == id);
      this.products[index] = res.data.data.data;
    }
  }
})