import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state: ()=> ({
    jwt: null,
    user: null,
  }),
  actions: {
    // JWT
    getJwt() {
      return this.jwt;
    },
    setJwt(jwt) {
      this.jwt = jwt;
    },
    // User
    getUser() {
      return this.user;
    },
    setUser(user) {
      this.user = user;
    },
  }
})