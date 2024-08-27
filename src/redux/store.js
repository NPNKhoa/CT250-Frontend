import authSlice from '@redux/slices/authSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { auth: authSlice },
});

export default store;
