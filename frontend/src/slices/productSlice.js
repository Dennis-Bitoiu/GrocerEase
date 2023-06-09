// This file defines a Redux slice called productSlice using the createSlice function from the @reduxjs/toolkit library.
// The slice defines an initial state with an array of products, a loading flag, and an error value.
// It also defines three reducers for handling product list requests, successful product list retrieval, and failed product list retrieval.
//
// The productListRequest reducer sets the loading state to true, while the productListSucces reducer sets the products state to the payload provided in the action and sets the loading state to false.
// The productListFail reducer sets the error state to the payload provided in the action and sets the loading state to false.
//
// The file exports the three action creators (productListRequest, productListSucces, and productListFail) generated by the createSlice function, and the reducer function to be used in the Redux store.

import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [], loading: false, error: null },
  reducers: {
    // State parameter represents the initial state
    productListRequest: state => {
      state.loading = true;
    },
    productListSucces: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    productListFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const productSlice = createSlice({
  name: 'product',
  initialState: { product: {}, loading: false, error: null },
  reducers: {
    productRequest: state => {
      state.loading = true;
    },
    productSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
    },
    productFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const removeProduct = createSlice({
  name: 'removeProduct',
  initialState: { loading: false, success: false, error: null },
  reducers: {
    productRemoveRequest: state => {
      state.loading = true;
    },
    productRemoveSuccess: state => {
      state.success = true;
      state.loading = false;
    },
    productRemoveFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const productCreate = createSlice({
  name: 'removeProduct',
  initialState: { product: {}, loading: false, error: null, success: false },
  reducers: {
    productCreateRequest: state => {
      state.loading = true;
    },
    productCreateSuccess: (state, action) => {
      state.success = true;
      state.loading = false;
      state.product = action.payload;
    },
    productCreateFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    productCreateReset: state => {
      state.success = false;
      state.product = null;
    },
  },
});

const productUpdate = createSlice({
  name: 'productUpdate',
  initialState: { product: null, loading: false, error: null },
  reducers: {
    productUpdateRequest: state => {
      state.loading = true;
    },
    productUpdateSuccess: (state, action) => {
      state.success = true;
      state.loading = false;
      state.product = action.payload;
    },
    productUpdateFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    productUpdateReset: state => {
      state.product = null;
    },
  },
});

// Actions that will be executed in the productsAction.js fil
export const { productListRequest, productListSucces, productListFail } =
  productsSlice.actions;

export const { productRequest, productSuccess, productFail } =
  productSlice.actions;
// The reducer of this file
export default productsSlice.reducer;
export { productSlice };

export const { productRemoveRequest, productRemoveSuccess, productRemoveFail } =
  removeProduct.actions;
export { removeProduct };

export const {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  productCreateReset,
} = productCreate.actions;

export { productCreate };

export const {
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
  productUpdateReset,
} = productUpdate.actions;

export { productUpdate };
