import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
interface ProductStore {
  defaultPriceId: string;
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  qnt: number;
}

interface ShoppingCartStore {
  cart: ProductStore[];
  add: (product: ProductStore) => void;
  remove: (id: string) => void;
}

export const shoppingCartStore = create<ShoppingCartStore>((set, get) => {
  return {
    cart: [],
    add(product) {
      const { cart } = get();
      const productInShoppingCartIndex = cart.findIndex(
        (productCart) => productCart.id === product.id
      );
      if (productInShoppingCartIndex < 0) {
        cart.push(product);
        set({ cart });
        return;
      }

      cart[productInShoppingCartIndex].qnt += product.qnt;

      set({ cart });
    },
    remove(id) {
      const { cart } = get();
      const productInShoppingCartIndex = cart.findIndex(
        (productCart) => productCart.id === id
      );

      if (cart[productInShoppingCartIndex]) {
        if (cart[productInShoppingCartIndex].qnt <= 1) {
          cart.splice(productInShoppingCartIndex, 1);
          set({ cart });
          return;
        }

        cart[productInShoppingCartIndex].qnt -= 1;

        set({ cart });
      }
    },
  };
});

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", shoppingCartStore);
}
