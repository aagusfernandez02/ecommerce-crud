import router from "@/router/router";
import { api } from "@/services/api";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useUserStore = defineStore('user', {
  state: () => ({
    jwt: null,
    user: null,
  }),
  actions: {
    async login(username, password) {

      let jwt = null;
      let user = null;

      try {
        const res = await api.post('/login', {
          username,
          password
        });
        const response_json = res.data;
        jwt = response_json.data.jwt;
        user = response_json.data.user;

      } catch (error) {
        toast.error(error.response.data.data.message);
        return false;
      }

      this.jwt = jwt;
      this.user = user;
      return true;
    },
    logout() {
      this.jwt = null;
      this.user = null;
      router.push('/login');
    }
  },
  persist: true
})