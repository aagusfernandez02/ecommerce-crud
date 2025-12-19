import { defineStore } from "pinia";

export const useShoppingCartStore = defineStore('shoppingCart', {
  state: ()=> ({
    items: []
  }),
  getters: {
    totalProducts: (state) =>{
        return state.items.reduce((acc, item)=> acc + item.quantity, 0);
    }
  },
  actions: {
    addItem(product) {
        let actualShoppingCartItem = this.items.find(item => item.id == product.id);
        if (actualShoppingCartItem) {
            actualShoppingCartItem.quantity++;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
    },
    increaseQuantity(productId, quantity=1) {
        let actualShoppingCartItem = this.items.find(item => item.id == productId);
        if (!actualShoppingCartItem) return;

        actualShoppingCartItem.quantity += quantity;
    },
    decreaseQuantity(productId, quantity=1) {
        let actualShoppingCartItem = this.items.find(item => item.id == productId);
        if (!actualShoppingCartItem) return;

        actualShoppingCartItem.quantity -= quantity;
    },
    deleteItem(productId) {
        this.items = this.items.filter(item => item.id != productId);
    }
  }
})