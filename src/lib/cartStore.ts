import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ProductType {
  id: string
  name: string
  imageUrl: string
  price: string
  priceNumber: number
  description: string
  defaultPriceId: string
}

interface CartStore {
  items: ProductType[],
  total: number,
  showDrawer: boolean,
  addToCart: (product: ProductType) => void,
  toggleDrawer: () => void
  removeItem: (productId: string) => void,
  resetCart: () => void
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      showDrawer: false,
      total: 0,
      addToCart: (product: ProductType) => {
        const { items, total } = get()
        if (!items.some(item => item.id === product.id)) {
          set({
            items: [...items, product],
            total: total + product.priceNumber
          })
          localStorage.setItem('NEXT_APP_CART_ITEMS', JSON.stringify(Array.from([...items, product])))
        }
      },
      removeItem: productId => {
        const { items, total } = get()
        set({
          items: items.filter(item => item.id !== productId),
          total: total - items.find(item => item.id === productId).priceNumber
        })
      },
      toggleDrawer: () => {
        const { showDrawer } = get()
        set({ showDrawer: !showDrawer })
      },
      resetCart: () => {
        set({
          items: [],
          total: 0
        })
      }
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      partialize: (state: CartStore) => ({
        items: state.items,
        total: state.items?.reduce((acc, item) => acc + item.priceNumber, 0) ?? 0
      }),
    },
  ),
)
