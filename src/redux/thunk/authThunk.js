import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@services/auth.service';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
      return data.data; // Trả về dữ liệu người dùng để lưu vào state
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
