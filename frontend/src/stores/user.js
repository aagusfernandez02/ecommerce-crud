import router from "@/router/router";
import { api } from "@/services/api";
import axios from "axios";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      try {
        const res = await api.get('/check-auth');
        this.user = res.data.user;
        return true;
      } catch (e) {
        this.user = null;
        return false;
      }
    },
    async login(username, password) {
      let user = null;

      try {
        const res = await api.post('/login', {
          username,
          password
        });
        const response_json = res.data;
        user = response_json.data.user;

      } catch (error) {
        toast.error(error.response.data.data.message);
        return false;
      }

      this.user = user;
      return true;
    },
    async logout() {
      this.user = null;
      await api.post('/logout');
      router.push('/login')
    }
  },
  persist: true
})