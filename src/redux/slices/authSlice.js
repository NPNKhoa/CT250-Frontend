import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, loginWithSocialThunk, logoutThunk } from '@redux/thunk/authThunk';

const initialState = {
  authUser: null,
  error: '',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
      })

      .addCase(loginWithSocialThunk.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loginWithSocialThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(loginWithSocialThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutThunk.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.loading = false;
        state.authUser = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
