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

const orderDetails = createSlice({
  name: 'orderDetails',
  initialState: {
    order: {},
    orderItems: [],
    loading: true,
    error: null,
  },
  reducers: {
    orderDetailsRequest: state => {
      state.loading = true;
    },
    orderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.orderItems = state.order.orderItems;
    },
    orderDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const orderPay = createSlice({
  name: 'orderPay',
  initialState: { loading: false, success: false, error: null },
  reducers: {
    orderPayRequest: state => {
      state.loading = true;
    },
    orderPaySuccess: state => {
      state.loading = false;
      state.success = true;
    },
    orderPayFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderPayReset: state => {
      state.order = {};
    },
  },
});

export const { orderCreateRequest, orderCreateSuccess, orderCreateFail } =
  orderCreate.actions;
export default orderCreate.reducer;

export const { orderDetailsRequest, orderDetailsSuccess, orderDetailsFail } =
  orderDetails.actions;
export { orderDetails };

export const { orderPayRequest, orderPaySuccess, orderPayFail, orderPayReset } =
  orderPay.actions;
export { orderPay };
