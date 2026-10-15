import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

const itemsLocalStorageKey = "itemsCart";

const saveToLocaleStorage = (args: counterItem[]) => {
  try {
    localStorage.setItem(itemsLocalStorageKey, JSON.stringify(args));
  } catch (error) {
    console.log(error);
  }
};

const loadCartFromLocalStorage = (): counterItem[] => {
  try {
    if (typeof window === "undefined") {
      return [];
    }
    const data = localStorage.getItem(itemsLocalStorageKey);
    if (!data) {
      return [];
    }
    const normData = JSON.parse(data);
    return normData;
  } catch {
    return [];
  }
};

export const selectTotalQuantity = (state: RootState) => {
  return state.cart.items.reduce((sum, num) => (sum += num.count), 0);
};

export interface counterItem {
  id: number | null;
  name: string;
  count: number;
}

interface counterState {
  items: counterItem[];
}

export const initialState: counterState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCountProduct(state, action: PayloadAction<counterItem>) {
      const newPizza = action.payload;
      const searchItem = state.items.find((item) => item.id === newPizza.id);

      if (searchItem) {
        searchItem.count += 1;
      } else {
        state.items.push({
          ...newPizza,
          count: 1,
        });
      }
      saveToLocaleStorage(state.items);
    },
    removeCountProduct(state, action: PayloadAction<counterItem>) {
      const newPizza = action.payload.id;
      const searchItem = state.items.find((item) => item.id === newPizza);

      if (searchItem && searchItem.count > 0) {
        searchItem.count -= 1;
      }
      if (searchItem && searchItem.count == 0) {
        state.items = state.items.filter((i) => i.id !== newPizza);
      }
      saveToLocaleStorage(state.items);
    },
    orderCreation(state) {
      state.items = [];

      saveToLocaleStorage(state.items);
    },
  },
});

export const { addCountProduct, removeCountProduct, orderCreation } =
  cartSlice.actions;

export default cartSlice.reducer;
