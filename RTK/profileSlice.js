import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'avatar',
  initialState: {
    avatar: null,
  },
  reducers: {
    setAvatar(state, action) {
      state.avatar = action.payload;
    },
    clearAvatar(state) {
      state.avatar = null;
    },
  },
});

export const { setAvatar, clearAvatar } = profileSlice.actions;
export default profileSlice.reducer;