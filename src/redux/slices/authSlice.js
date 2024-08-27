import { createSlice } from '@reduxjs/toolkit';
import { loginThunk } from '@redux/thunk/authThunk';

const initialState = {
  authUser: null,
  error: '',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.authUser = null; // Đăng xuất
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.loading = true;
        state.error = ''; // Xóa lỗi khi bắt đầu đăng nhập mới
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload; // Lưu trữ thông tin người dùng vào state
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu trữ lỗi khi đăng nhập thất bại
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
