import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [], shippingAddress: {} },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(x => x.id === item.id);

      //   If Item exist, return a new array where only the item with the same ID as `item` gets updated
      if (existItem) {
        state.cartItems = state.cartItems.map(x =>
          x.id === existItem.id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        product => product.id !== action.payload.id
      );
    },
    cartSaveShippingAddress: (state, action) => {
      state = { ...state };
      state.shippingAddress = action.payload;
    },
  },
});

export const { addItem, removeItem, cartSaveShippingAddress } =
  cartSlice.actions;

export default cartSlice.reducer;
