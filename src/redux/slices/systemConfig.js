import { getCurrentConfigs } from '@redux/thunk/systemConfig';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentConfigs: {},
  error: '',
  loading: false,
};

const systemConfigsSlice = createSlice({
  name: 'systemConfigs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCurrentConfigs.pending, state => {
        state.loading = true;
      })
      .addCase(getCurrentConfigs.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConfigs = action.payload;
      })
      .addCase(getCurrentConfigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default systemConfigsSlice.reducer;
