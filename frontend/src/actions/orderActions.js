import axios from 'axios';
import {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
  orderPayRequest,
  orderPaySuccess,
  orderPayFail,
  orderListMyRequest,
  orderListMySuccess,
  orderListMyFail,
  ordersListRequest,
  ordersListSuccess,
  ordersListFail,
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverFail,
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

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderPayRequest());

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

      // PaymentResult will be sent in the req.body object
      const { data } = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch(orderPaySuccess(data));
    } catch (error) {
      const customMessage = error.response.data.message;
      dispatch(
        orderPayFail(
          error.response && customMessage ? customMessage : error.message
        )
      );
    }
  };

export const deliverOrder = order => async (dispatch, getState) => {
  try {
    dispatch(orderDeliverRequest());

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

    const { data } = await axios.put(
      `http://localhost:5000/api/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch(orderDeliverSuccess(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      orderDeliverFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderListMyRequest());

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
    const { data } = await axios.get(
      `http://localhost:5000/api/orders/myorders`,
      config
    );

    dispatch(orderListMySuccess(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      orderListMyFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};

export const listAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch(ordersListRequest());

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
    const { data } = await axios.get(
      `http://localhost:5000/api/orders`,
      config
    );

    dispatch(ordersListSuccess(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      ordersListFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};
