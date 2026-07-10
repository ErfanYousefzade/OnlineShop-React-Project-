import { create } from "zustand";

const useCart = create((set) => ({
  cart: [],

  add: (id) =>
    set((state) => {
      const found = state.cart.find((item) => item.id === id);

      if (found) {
        return {
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { id, quantity: 1 }],
      };
    }),

  remove: (id) =>
    set((state) => {
      const found = state.cart.find((item) => item.id === id);

      if (!found) return state;

      if (found.quantity === 1) {
        return {
          cart: state.cart.filter((item) => item.id !== id),
        };
      }

      return {
        cart: state.cart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }),

  clear: () => set({ cart: [] }),
  removepack :(id) => set((state)=>(
    {cart : state.cart.filter(item => item.id !=id )})),
}));

export default useCart;