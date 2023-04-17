// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlice';
import { productSlice } from './slices/productSlice';

const store = configureStore({
  reducer: {
    productsList: productsReducer,
    product: productSlice.reducer,
  },
});

export default store;
