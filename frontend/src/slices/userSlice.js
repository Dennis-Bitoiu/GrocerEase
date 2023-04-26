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

const userDetailsReducer = createSlice({
  name: 'userRegister',
  initialState: { user: {}, loading: false, error: null },
  reducers: {
    userDetailsRequest: state => {
      state = { ...state };
      state.loading = true;
    },
    userDetailsSucces: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    userDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userDetailsReset: state => {
      state.loading = false;
      state.user = {};
    },
  },
});

const userUpdateProfileReducer = createSlice({
  name: 'userUpdateProfile',
  initialState: { userInfo: {}, loading: false, error: null, success: false },
  reducers: {
    userUpdateProfileRequest: state => {
      state = { ...state };
      state.loading = true;
    },
    userUpdateProfileSucces: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.success = true;
    },
    userUpdateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userUpdateProfileReset: (state, action) => {
      state.loading = false;
    },
  },
});

export const { userLoginRequest, userLoginSucces, userLoginFail, userLogout } =
  userSlice.actions;
export default userSlice.reducer;

export const { userRegisterRequest, userRegisterSucces, userRegisterFail } =
  userRegisterReducer.actions;
export { userRegisterReducer };

export const {
  userDetailsRequest,
  userDetailsSucces,
  userDetailsFail,
  userDetailsReset,
} = userDetailsReducer.actions;
export { userDetailsReducer };

export const {
  userUpdateProfileRequest,
  userUpdateProfileSucces,
  userUpdateProfileFail,
  userUpdateProfileReset,
} = userUpdateProfileReducer.actions;
export { userUpdateProfileReducer };
