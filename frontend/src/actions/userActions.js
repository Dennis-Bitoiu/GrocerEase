import axios from 'axios';
import {
  userLoginRequest,
  userLoginSucces,
  userLoginFail,
  userLogout,
  userRegisterRequest,
  userRegisterSucces,
  userRegisterFail,
  userDetailsRequest,
  userDetailsSucces,
  userDetailsFail,
  userDetailsReset,
  userUpdateProfileRequest,
  userUpdateProfileSucces,
  userUpdateProfileFail,
  usersListRequest,
  usersListSucces,
  usersListFail,
  usersListReset,
  userDeleteRequest,
  userDeleteSucces,
  userDeleteFail,
  userUpdateRequest,
  userUpdateSucces,
  userUpdateFail,
} from '../slices/userSlice';
import { orderListMyReset } from '../slices/orderSlice';
import { cartReset } from '../slices/cartSlice';

export const login = (email, password) => async dispatch => {
  try {
    dispatch(userLoginRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://localhost:5000/api/users/login',
      { email, password },
      config
    );
    dispatch(userLoginSucces(data));

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      userLoginFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem('userInfo');
  dispatch(userLogout());
  dispatch(userDetailsReset());
  dispatch(orderListMyReset());
  dispatch(cartReset());
  dispatch(usersListReset());
};

// Register Action
// Upon successfull registration, login the user and store the data that came back from the API
// Into the local storage
export const register = (name, email, password) => async dispatch => {
  try {
    dispatch(userRegisterRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://localhost:5000/api/users',
      { name, email, password },
      config
    );

    dispatch(userRegisterSucces(data));

    // By dispatching userLoginSucces() we also set the state of the userLogin state
    dispatch(userLoginSucces(data));

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      userRegisterFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};

export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch(userDetailsRequest());

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

    const { data } = await axios.get(
      `http://localhost:5000/api/users/${id}`,
      config
    );

    dispatch(userDetailsSucces(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      userDetailsFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};

export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch(userUpdateProfileRequest());

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
      `http://localhost:5000/api/users/profile`,
      user,
      config
    );

    dispatch(userUpdateProfileSucces(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      userUpdateProfileFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch(usersListRequest());

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

    const { data } = await axios.get(`http://localhost:5000/api/users`, config);

    dispatch(usersListSucces(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      usersListFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};

export const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch(userDeleteRequest());

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

    await axios.delete(`http://localhost:5000/api/users/${id}`, config);

    dispatch(userDeleteSucces());
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      userDeleteFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};

export const updateUser = user => async (dispatch, getState) => {
  try {
    dispatch(userUpdateRequest());

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
      `http://localhost:5000/api/users/${user._id}`,
      user,
      config
    );

    dispatch(userUpdateSucces(data));

    // After the update is complete, update the user details on the page.
    // This is done by dispatching userDetailsSuccess and passing in as parameter the data that comes back from the api
    dispatch(userDetailsSucces(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(
      userUpdateFail(
        error.response && customMessage ? customMessage : error.message
      )
    );
  }
};
