import axios from 'axios';
import {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
} from '../slices/orderSlice';

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch(orderCreateRequest());

    // Retrieve the userInfo object from the 'userLogin' state
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Pass token through the authorization header
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/orders/`,
      order,
      config
    );

    dispatch(orderCreateSuccess(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      orderCreateFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};

// Retrieve order details from the server for a given order ID.
// Dispatch an action to show that the request is being made
// Dispatch a success action with the fetched data or a fail action with the error message.
export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsRequest());

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

    const { data } = await axios.get(
      `http://localhost:5000/api/orders/${id}`,
      config
    );

    dispatch(orderDetailsSuccess(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      orderDetailsFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};
