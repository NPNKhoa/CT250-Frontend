import addressSlice from '@redux/slices/addressSlice';
import authSlice from '@redux/slices/authSlice';
import userSlice from '@redux/slices/userSlice';
import cartSlice from '@redux/slices/cartSlice';
import systemConfigsSlice from '@redux/slices/systemConfig';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    users: userSlice,
    auth: authSlice,
    address: addressSlice,
    cart: cartSlice,
    systemConfigs: systemConfigsSlice,
  },
});

export default store;
