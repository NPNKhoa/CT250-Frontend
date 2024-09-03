import authSlice from '@redux/slices/authSlice';
import userSlice from '@redux/slices/userSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { users: userSlice, auth: authSlice },
});

export default store;
