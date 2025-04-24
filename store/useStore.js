import { create } from "zustand";

export const useStore = create((set) => ({
  cartItems: [],

  addToCart: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),

  removeAllFromCart: () => set({ cartItems: [] }),

  updateCartItemCount: (itemName, delta) =>
    set((state) => {
      const counts = {};
      const updated = [];

      // Group items
      state.cartItems.forEach((item) => {
        counts[item.name] = counts[item.name] || { ...item, count: 0 };
        counts[item.name].count += 1;
      });

      if (counts[itemName]) {
        counts[itemName].count += delta;
        if (counts[itemName].count < 0) counts[itemName].count = 0;
      }

      // Rebuild array
      Object.values(counts).forEach((item) => {
        for (let i = 0; i < item.count; i++) {
          updated.push({ name: item.name, image: item.image });
        }
      });

      return { cartItems: updated };
    }),
}));