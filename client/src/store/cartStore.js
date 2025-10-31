import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      count: 0,
      totalPrice: 0,
      cartId: null,
      itemState: {},
      increment: () => set((state) => ({ count: state.count + 1 })),
      resetCount: () => set({count: 0}),
      decrement: () => set((state) => ({
        count: state.count > 0 ? state.count - 1 : 0 
      })),
      setTotalPrice: (total) => set((state) => ({
        totalPrice: total
      })),      
      setCartId: (id) => set({cartId: id}),
      setItemAdded: (id) =>
        set((state) => ({
          itemState: { ...state.itemState, [id]: true },
        })),

      setItemRemoved: (id) =>
        set((state) => ({
          itemState: { ...state.itemState, [id]: false },
        })),

      resetItemState: () => set({itemState: {}}),

      isItemAdded: (id) => get().itemState[id] ?? false,

    }),
    {
      name: "count-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
