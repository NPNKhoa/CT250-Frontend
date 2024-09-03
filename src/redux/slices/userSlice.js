import { createSlice } from '@reduxjs/toolkit';
import { getUserById, getLoggedInUser } from '@redux/thunk/userThunk'; // Đảm bảo đường dẫn đúng

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
      // Xử lý trạng thái khi getUserById được gọi
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

      // Xử lý trạng thái khi getLoggedInUser được gọi
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
      });
  },
});

export default userSlice.reducer;
