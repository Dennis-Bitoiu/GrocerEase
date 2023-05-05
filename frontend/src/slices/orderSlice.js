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
    resetOrderCreate: state => {
      state.success = false;
    },
  },
});

const orderDetails = createSlice({
  name: 'orderDetails',
  initialState: {
    order: null,
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
    orderReset: state => {
      state.order = null;
    },
  },
});

const orderPay = createSlice({
  name: 'orderPay',
  initialState: { order: {}, loading: false, success: false, error: null },
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
      state.success = false;
    },
  },
});

const myOrdersReducer = createSlice({
  name: 'myOrdersReducer',
  initialState: { orders: [], loading: false, error: null },
  reducers: {
    orderListMyRequest: state => {
      state.loading = true;
    },
    orderListMySuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    orderListMyFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderListMyReset: state => {
      state.loading = false;
      state.orders = [];
    },
  },
});

const ordersList = createSlice({
  name: 'ordersList',
  initialState: { orders: [], loading: false, error: null },
  reducers: {
    ordersListRequest: state => {
      state.loading = true;
    },
    ordersListSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    ordersListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
  resetOrderCreate,
} = orderCreate.actions;
export default orderCreate.reducer;

export const {
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
  orderReset,
} = orderDetails.actions;
export { orderDetails };

export const { orderPayRequest, orderPaySuccess, orderPayFail, orderPayReset } =
  orderPay.actions;
export { orderPay };

export const {
  orderListMyRequest,
  orderListMySuccess,
  orderListMyFail,
  orderListMyReset,
} = myOrdersReducer.actions;
export { myOrdersReducer };

export const { ordersListRequest, ordersListSuccess, ordersListFail } =
  ordersList.actions;
export { ordersList };
