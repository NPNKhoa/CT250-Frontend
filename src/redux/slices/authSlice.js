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
      localStorage.removeItem('refreshToken');
    },
    setCredentials: (state, action) => {
      state.authUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
