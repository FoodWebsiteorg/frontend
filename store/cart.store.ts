import { create } from 'zustand';

interface CartItem {
  providerId: string;
  providerName: string;
  category: string;
  price: number;
  date?: string;
  timeSlot?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (providerId: string) => void;
  clearCart: () => void;
  updateItem: (providerId: string, updates: Partial<CartItem>) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) => i.providerId === item.providerId
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = item;
        return { items: updated };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (providerId) =>
    set((state) => ({
      items: state.items.filter((item) => item.providerId !== providerId),
    })),
  clearCart: () => set({ items: [] }),
  updateItem: (providerId, updates) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.providerId === providerId ? { ...item, ...updates } : item
      ),
    })),
}));

