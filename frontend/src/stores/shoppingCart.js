import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useShoppingCartStore = defineStore('shoppingCart', {
    state: () => ({
        items: [],
        navigationDrawerOpen: false,
    }),
    getters: {
        totalProducts: (state) => {
            return state.items.reduce((acc, item) => acc + item.quantity, 0);
        },
        totalPrice: (state) => {
            return state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
    },
    actions: {
        handleToggleShoppingCartDrawer() {
            if (this.totalProducts == 0) {
                toast.error('Empty cart', { autoClose: 1500, position: 'bottom-right' });
                return;
            }
            this.navigationDrawerOpen = !this.navigationDrawerOpen;
        },
        closeShoppingCartDrawer() {
            this.navigationDrawerOpen = false;
        },
        clearShoppingCart() {
            this.items = [];
            this.closeShoppingCartDrawer();
        },
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
        increaseQuantity(productId, quantity = 1) {
            let actualShoppingCartItem = this.items.find(item => item.id == productId);
            if (!actualShoppingCartItem) return;

            actualShoppingCartItem.quantity += quantity;
        },
        decreaseQuantity(productId, quantity = 1) {
            let actualShoppingCartItem = this.items.find(item => item.id == productId);
            if (!actualShoppingCartItem) return;

            actualShoppingCartItem.quantity -= quantity;
        },
        deleteItem(productId) {
            this.items = this.items.filter(item => item.id != productId);
            if (this.totalPrice == 0) {
                this.closeShoppingCartDrawer();
            }
        }
    }
})