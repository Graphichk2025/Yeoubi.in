import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number | null;
  image_url: string | null;
  sizes: string[];
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  removeItem: (productId: string, size: string) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(
          i => i.product.id === item.product.id && i.size === item.size
        );
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.product.id === item.product.id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity }
              : item
          )
        });
      },

      removeItem: (productId, size) => {
        set({
          items: get().items.filter(
            item => !(item.product.id === productId && item.size === size)
          )
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      setOpen: (isOpen) => set({ isOpen }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'yeoubi-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
