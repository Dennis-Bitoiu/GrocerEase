// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    productsList: productReducer,
  },
});

export default store;
