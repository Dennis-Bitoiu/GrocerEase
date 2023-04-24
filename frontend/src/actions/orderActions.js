import axios from 'axios';
import {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
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
