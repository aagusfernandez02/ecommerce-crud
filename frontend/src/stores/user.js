import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state: ()=> ({
    jwt: null,
    user: null,
  }),
  actions: {
  }
})