import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore('modal', () => {
  // ----------------- STATE -----------------
  // Product modal
  const productModal = ref(false);
  const mode = ref(''); // create, edit
  const productData = ref({});
  
  // ----------------- ACTIONS -----------------
  const closeAll = () => {
    // Product modal
    productModal.value = false;
    mode.value = '';
    productData.value = {};
  }

  return {
    productModal,
    mode,
    productData,
    closeAll
  }
})