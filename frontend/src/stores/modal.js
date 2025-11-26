import { defineStore } from "pinia";

export const useModalStore = defineStore('modal', {
  state: () => ({
    createProduct: false,
  }),
  actions: {
    closeAll() {
      this.createProduct = false;
    }
  }
})