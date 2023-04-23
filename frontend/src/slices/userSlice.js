import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { userInfo: {}, loading: false, error: null },
  reducers: {
    userLoginRequest: state => {
      state.loading = true;
    },
    userLoginSucces: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    userLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: state => {
      state.userInfo = null;
    },
  },
});

const userRegisterReducer = createSlice({
  name: 'userRegister',
  initialState: { userInfo: null, loading: false, error: null },
  reducers: {
    userRegisterRequest: state => {
      state.loading = true;
    },
    userRegisterSucces: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    userRegisterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userLoginRequest, userLoginSucces, userLoginFail, userLogout } = userSlice.actions;

export const { userRegisterRequest, userRegisterSucces, userRegisterFail } = userRegisterReducer.actions;
export { userRegisterReducer };

export default userSlice.reducer;
