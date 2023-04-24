import { createSlice } from '@reduxjs/toolkit';

const orderCreate = createSlice({
  name: 'addOrder',
  initialState: { order: {}, loading: false, success: false, error: null },
  reducers: {
    orderCreateRequest: state => {
      state.loading = true;
    },
    orderCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    orderCreateFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const { orderCreateRequest, orderCreateSuccess, orderCreateFail } =
  orderCreate.actions;
export default orderCreate.reducer;
