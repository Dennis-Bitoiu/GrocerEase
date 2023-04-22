import axios from 'axios';
import { userLoginRequest, userLoginSucces, userLoginFail } from '../slices/userSlice';

export const login = (email, password) => async dispacth => {
  try {
    dispacth(userLoginRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = axios.post('http://localhost:5000/api/users/login', { email, password }, config);
    dispacth(userLoginSucces(data));

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const customMessage = error.response.data.message;
    dispatch(userLoginFail(error.response && customMessage ? customMessage : error.message));
  }
};
