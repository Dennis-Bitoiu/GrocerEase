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
      state.userInfo = {};
    },
  },
});

export const { userLoginRequest, userLoginSucces, userLoginFail, userLogout } = userSlice.actions;

export default userSlice.reducer;
