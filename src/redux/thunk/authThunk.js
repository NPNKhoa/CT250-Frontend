import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@services/auth.service';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);

      // console.log(data.data);

      // Lưu access token và refresh token vào localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// export const logoutThunk = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await authService.logout();

//       // Xóa dữ liệu từ localStorage
//       localStorage.removeItem('token');
//       localStorage.removeItem('refreshToken');

//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response.data.error);
//     }
//   }
// );
