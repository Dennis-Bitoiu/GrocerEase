import axios from 'axios';
import {
  userLoginRequest,
  userLoginSucces,
  userLoginFail,
  userLogout,
  userRegisterRequest,
  userRegisterSucces,
  userRegisterFail,
} from '../slices/userSlice';

export const login = (email, password) => async dispatch => {
  try {
    dispatch(userLoginRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password }, config);
    dispatch(userLoginSucces(data));

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(userLoginFail(error.response && customMessage ? customMessage : error.message));
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem('userInfo');
  dispatch(userLogout());
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

    const { data } = await axios.post('http://localhost:5000/api/users', { name, email, password }, config);

    dispatch(userRegisterSucces(data));
    dispatch(userLoginSucces(data));

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(userRegisterFail(error.response && customMessage ? customMessage : error.message));
  }
};
