import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import profileReducer from './profileSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        avatar: profileReducer
    },
});

export default store;