// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlice';
import {
  productSlice,
  removeProduct,
  productCreate,
  productUpdate,
} from './slices/productSlice';
import cartSliceReducer from './slices/cartSlice';
import userSliceReducer from './slices/userSlice';
import {
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  usersListReducer,
  userDelete,
  userUpdate,
} from './slices/userSlice';
import orderCreateReducer, {
  orderDetails,
  orderPay,
  myOrdersReducer,
} from './slices/orderSlice';

// Retrieve the cartItems array from the browser's localStorage API.
// The localStorage.getItem method is used to retrieve the serialized version of the array.
// The JSON.parse method is used to convert the JSON string back to an array.
// If there are no cart items in localStorage, set cartItemsFromLocalStorage to an empty array.
// This line of code is used in the initialization of the Redux store to check if there are any
// Previously saved cart items and load them if they exist.
const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

// Specify what the initial state of a state should be
const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const store = configureStore({
  reducer: {
    productsList: productsReducer,
    product: productSlice.reducer,
    removeProduct: removeProduct.reducer,
    productCreate: productCreate.reducer,
    productUpdate: productUpdate.reducer,
    cart: cartSliceReducer,
    userLogin: userSliceReducer,
    userRegister: userRegisterReducer.reducer,
    userDetails: userDetailsReducer.reducer,
    userUpdateProfile: userUpdateProfileReducer.reducer,
    usersListReducer: usersListReducer.reducer,
    userDelete: userDelete.reducer,
    userUpdate: userUpdate.reducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetails.reducer,
    orderPay: orderPay.reducer,
    myOrdersReducer: myOrdersReducer.reducer,
  },
  preloadedState: initialState,
});

export default store;
