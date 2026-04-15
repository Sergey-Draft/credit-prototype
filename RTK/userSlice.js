import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log('ACTION', action);
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    userLoansHistory: (state, action) => {
      state.userLoans = action.payload;
    },
    userRequestsHistory: (state, action) => {
      state.userRequests = action.payload;
    }
  },
});

export const { loginSuccess, logout, saveUser, userLoansHistory, userRequestsHistory } = userSlice.actions;
export default userSlice.reducer;
