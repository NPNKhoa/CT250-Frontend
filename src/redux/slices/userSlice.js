// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  getUserById,
  getLoggedInUser,
  updateUserInfoThunk,
} from '@redux/thunk/userThunk';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLoggedInUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getLoggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Thêm logic cho updateUserInfoThunk
      .addCase(updateUserInfoThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Cập nhật thông tin user sau khi cập nhật thành công
      })
      .addCase(updateUserInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
