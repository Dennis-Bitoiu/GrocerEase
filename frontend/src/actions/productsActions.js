// This file exports a function called fetchProducts that uses Axios to make a GET request to a product API endpoint.
// Before making the request, it dispatches the productListRequest action to indicate that the request is in progress.
// If the request is successful, it dispatches the productListSucces action with the retrieved product data.
// If the request fails, it dispatches the productListFail action with an error message, either from the server response or from the request itself.
// The fetchProducts function is meant to be used as an async thunk and is being called inside the HomeScreen.js Componenet

import axios from 'axios';
import {
  productListRequest,
  productListSucces,
  productListFail,
} from '../slices/productSlice';

import {
  productRequest,
  productSuccess,
  productFail,
  productRemoveRequest,
  productRemoveSuccess,
  productRemoveFail,
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
} from '../slices/productSlice';

export const fetchProducts = () => async dispatch => {
  dispatch(productListRequest());
  try {
    const response = await axios.get('http://localhost:5000/api/products');

    dispatch(productListSucces(response.data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      productListFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};

export const fetchProduct = id => async dispatch => {
  dispatch(productRequest());
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );
    dispatch(productSuccess(response.data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      productFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch(productRemoveRequest());

    // Retrieve the userInfo object from the 'userLogin' state
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // Pass token through the authorization header
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // PaymentResult will be sent in the req.body object
    await axios.delete(`http://localhost:5000/api/products/${id}`, config);

    dispatch(productRemoveSuccess());
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      productRemoveFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(productCreateRequest());

    // Retrieve the userInfo object from the 'userLogin' state
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // Pass token through the authorization header
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Passed empty object as second parameter since this is a post request
    // The object is created by the createProduct controller
    const { data } = await axios.post(
      `http://localhost:5000/api/products`,
      {},
      config
    );

    dispatch(productCreateSuccess(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      productCreateFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};
