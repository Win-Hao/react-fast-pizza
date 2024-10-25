import { create } from 'zustand';
import { CartType } from '../features/cart/Cart.tsx';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

type State = {
  cart: CartType[];
};

type Action = {
  addItem: (item: CartType) => void;
  deleteItem: (pizzaId: number) => void;
  increaseItemQuantity: (pizzaId: number) => void;
  decreaseItemQuantity: (pizzaId: number) => void;
  clearCart: () => void;
};

// Create your store, which includes both state and (optionally) actions
const useCartStore = create<State & Action>()(
  devtools(
    immer((set) => ({
      cart: [],
      // Add cart
      addItem: (item) =>
        set((state) => {
          state.cart.push(item);
        }),
      // Delete cart
      deleteItem: (pizzaId) =>
        set((state) => {
          state.cart = state.cart.filter((item) => item.pizzaId !== pizzaId);
          console.log(state.cart);
        }),
      increaseItemQuantity: (pizzaId) =>
        set((state) => {
          const item = state.cart.find((item) => item.pizzaId === pizzaId);
          if (item) {
            item.quantity += 1;
            item.totalPrice = item.quantity * item.unitPrice;
          }
        }),
      decreaseItemQuantity: (pizzaId) => {
        set((state) => {
          const item = state.cart.find((item) => item.pizzaId === pizzaId);
          if (item) {
            item.quantity -= 1;
            item.totalPrice = item.quantity * item.unitPrice;
            if (item.quantity === 0) {
              state.cart = state.cart.filter(
                (item) => item.pizzaId !== pizzaId,
              );
            }
          }
        });
      },
      clearCart: () =>
        set((state) => {
          state.cart = [];
        }),
    })),
  ),
);

const useCart = () => useCartStore((state) => state.cart);
const useAddItem = () => useCartStore((state) => state.addItem);
const useDeleteItem = () => useCartStore((state) => state.deleteItem);
const useIncreaseItemQuantity = () =>
  useCartStore((state) => state.increaseItemQuantity);
const useDecreaseItemQuantity = () =>
  useCartStore((state) => state.decreaseItemQuantity);
const useClearCart = () => useCartStore((state) => state.clearCart);

const useCurrentQuantity = (pizzaId: number) => {
  const cart = useCart();
  return cart.find((item) => item.pizzaId === pizzaId)?.quantity ?? 0;
};

const useTotalCartPrice = () => {
  const cart = useCart();
  return cart.reduce((sum, item) => sum + item.totalPrice, 0);
};

export {
  useCart,
  useAddItem,
  useDeleteItem,
  useIncreaseItemQuantity,
  useDecreaseItemQuantity,
  useCurrentQuantity,
  useTotalCartPrice,
  useClearCart,
};
