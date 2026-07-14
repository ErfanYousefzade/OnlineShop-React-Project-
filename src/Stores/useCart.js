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

    remove : (id) => {set((prev) =>{
      const findobj=prev.cart.find(item => item.id===id)
      if (!findobj){ return{ cart : prev.cart}}

      else{
        if(findobj.quantity>1){
          return{
          cart :prev.cart.map(item => item.id ===id ?
            {...item ,quantity:item.quantity-1} :
            item

           )
          }
        }
        else{
          return{cart : prev.cart.filter(item => item.id != id )}
          
        }
      }

    })}
  ,



  removepack: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  clear: () =>
    set({
      cart: [],
    }),
}));

export default useCart;