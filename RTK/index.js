import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import profileReducer from './profileSlice';
import { userApi } from '../src/services/userApi';

const combinedReducer = combineReducers({
  user: userReducer,
  avatar: profileReducer,
  [userApi.reducerPath]: userApi.reducer,
});

// При логауте сбрасываем весь стор (включая RTK Query кэш) передавая undefined
// Иначе, если быстро перезайти другим пользователем,
// подтянуться на дашборд старые кешированные данные
const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
